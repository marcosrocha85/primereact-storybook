#!/usr/bin/env bash
set -Eeuo pipefail

usage() {
  cat <<'USAGE'
Usage: bash scripts/implement-issues.sh [--dry-run] ISSUE [ISSUE ...]
       bash scripts/implement-issues.sh --resume RUN_DIRECTORY

Implements issues in the supplied order, creates PRs, squash-merges them and
returns to a clean main after each issue. Stops on an unresolved failure after bounded recovery.

Options:
  --dry-run  Print the sequence without running Codex, Git or GitHub commands.
  --resume   Resume a preserved implementation checkpoint (before commit/PR).
  --help     Show this help.

Environment:
  CODEX_MAX_ATTEMPTS     Attempts per issue/resume, including the first (default: 3; max: 10).
  CODEX_MODEL           Optional model; otherwise use the local Codex default.
  CODEX_PROFILE         Optional Codex profile.
  CHECK_TIMEOUT_SECONDS Time limit for GitHub checks/merge (default: 1200).

Requires Bash 4.4+, Git, gh, Node.js, npm, flock and an authenticated Codex CLI.
Start on main with a clean working tree. Logs remain in .git/codex-issue-runs.
USAGE
}

die() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }
issues=()
dry_run=false
resume_dir=''
while (($#)); do
  argument=$1
  shift
  case "$argument" in
    --resume) (($#)) || die "Missing resume directory"; [[ -z "$resume_dir" ]] || die "Duplicate --resume"; resume_dir=$1; shift ;;
    --help|-h) usage; exit 0 ;;
    --dry-run) dry_run=true ;;
    *)
      issue=${argument#\#}
      [[ "$issue" =~ ^[1-9][0-9]*$ ]] || die "Invalid issue: $argument"
      for previous in "${issues[@]}"; do
        [[ "$previous" != "$issue" ]] || die "Duplicate issue: #$issue"
      done
      issues+=("$issue")
      ;;
  esac
done
[[ -z "$resume_dir" ]] || { ((${#issues[@]} == 0)) && ! "$dry_run" || die "Use --resume without issue numbers or --dry-run"; }
((${#issues[@]})) || [[ -n "$resume_dir" ]] || { usage >&2; exit 1; }
if "$dry_run"; then
  for issue in "${issues[@]}"; do
    printf '#%s: update main -> codex/issue-%s -> Codex -> PR -> checks -> squash -> clean main\n' "$issue" "$issue"
  done
  exit 0
fi

for command in git gh node npm codex flock; do
  command -v "$command" >/dev/null || die "Required command not found: $command"
done
support_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/issue-runner" && pwd)"
root="$(git -C "$support_dir" rev-parse --show-toplevel)"
cd "$root"
repo='marcosrocha85/primereact-storybook'
timeout_seconds=${CHECK_TIMEOUT_SECONDS:-1200}
[[ "$timeout_seconds" =~ ^[1-9][0-9]*$ ]] || die 'CHECK_TIMEOUT_SECONDS must be a positive integer'
run_dir=''
trap 'code=$?; if ((code)); then printf "Stopped. Existing work and branches were preserved. Logs: %s\n" "${run_dir:-not started}" >&2; fi' EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

require_no_operation() {
  for operation in MERGE_HEAD CHERRY_PICK_HEAD REVERT_HEAD rebase-merge rebase-apply; do
    [[ ! -e "$(git rev-parse --git-path "$operation")" ]] || die "Unfinished Git operation: $operation"
  done
}
require_clean() {
  require_no_operation
  [[ -z "$(git status --porcelain)" ]] || die 'Working tree is dirty; commit or resolve existing work first.'
}
field() {
  node -e 'let v=JSON.parse(require("node:fs").readFileSync(0,"utf8")); for(const k of process.argv[1].split("."))v=v?.[k]; if(v===undefined||v===null)process.exit(1); process.stdout.write(String(v));' "$1"
}

require_no_operation
if [[ -z "$resume_dir" ]]; then
  require_clean
  [[ "$(git branch --show-current)" == main ]] || die 'Start on main; finish or merge the current implementation first.'
fi
[[ "${CODEX_MAX_ATTEMPTS:-3}" =~ ^([1-9]|10)$ ]] || die 'CODEX_MAX_ATTEMPTS must be between 1 and 10'
[[ "$(gh repo view "$(git remote get-url origin)" --json nameWithOwner --jq .nameWithOwner)" == "$repo" ]] || die 'origin must point to the expected GitHub repository.'
[[ "$(gh repo view "$repo" --json defaultBranchRef --jq .defaultBranchRef.name)" == main ]] || die 'Expected main as the default branch.'
git_dir="$(git rev-parse --path-format=absolute --git-common-dir)"
exec 9>"$git_dir/codex-issues.lock"
flock -n 9 || die 'Another issue runner is active for this repository.'
mkdir -p "$git_dir/codex-issue-runs"
if [[ -n "$resume_dir" ]]; then
  run_dir="$(cd "$resume_dir" && pwd -P)"
  [[ "$run_dir" == "$git_dir"/codex-issue-runs/run-* ]] || die 'Resume directory must belong to this checkout'
  resume_issue="$(cat "$run_dir/current-issue")"
  [[ "$resume_issue" =~ ^[1-9][0-9]*$ ]] || die 'Invalid checkpoint issue'
  mapfile -t issues < "$run_dir/issues.list"
  remaining=()
  found=false
  for issue in "${issues[@]}"; do
    [[ "$issue" =~ ^[1-9][0-9]*$ ]] || die 'Invalid saved issue'
    [[ "$issue" != "$resume_issue" ]] || found=true
    if "$found"; then remaining+=("$issue"); fi
  done
  "$found" || die 'Checkpoint issue missing from saved queue'
  issues=("${remaining[@]}")
  base_sha="$(node "$run_dir/support/recover.mjs" resume "$run_dir/issue-$resume_issue" "$root")"
else
  run_dir="$(mktemp -d "$git_dir/codex-issue-runs/run-XXXXXXXX")"
  cp -R "$support_dir" "$run_dir/support"
  printf '%s\n' "${issues[@]}" > "$run_dir/issues.list"
fi
support_dir="$run_dir/support"
printf 'Logs: %s\n' "$run_dir"
codex_args=(-a never exec --sandbox workspace-write -c sandbox_workspace_write.network_access=true -C "$root")
[[ -z "${CODEX_MODEL:-}" ]] || codex_args+=(-m "$CODEX_MODEL")
[[ -z "${CODEX_PROFILE:-}" ]] || codex_args+=(-p "$CODEX_PROFILE")

for issue in "${issues[@]}"; do
  if [[ -z "$resume_dir" ]]; then
    require_clean
    [[ "$(git branch --show-current)" == main ]] || die 'Expected main before starting the next issue.'
  fi
  issue_dir="$run_dir/issue-$issue"
  mkdir -p "$issue_dir"
  gh issue view "$issue" --repo "$repo" --json number,state,title,body,comments,assignees > "$issue_dir/issue.json"
  if [[ "$(field state < "$issue_dir/issue.json")" == CLOSED ]]; then
    [[ -z "$resume_dir" ]] || die 'Resumed issue was closed externally; inspect preserved work'
    printf '#%s is closed; skipping.\n' "$issue"
    continue
  fi
  # Read every page; Codex decides semantic dependencies from this live context.
  gh api --paginate "repos/$repo/issues?state=open&labels=component-review&sort=created&direction=asc&per_page=100" > "$issue_dir/queue.json"
  gh api --paginate "repos/$repo/pulls?state=open&per_page=100" --jq '.[] | {number, body, head: .head.ref}' > "$issue_dir/open-prs.jsonl"
  branch="codex/issue-$issue"
  node "$support_dir/verify.mjs" open-prs "$issue_dir/open-prs.jsonl" "$issue" "$branch"
  if [[ -z "$resume_dir" ]]; then
    if git show-ref --verify --quiet "refs/heads/$branch"; then die "Branch already exists: $branch"; fi
    [[ -z "$(git ls-remote --heads origin "refs/heads/$branch")" ]] || die "Remote branch already exists: $branch"
    git pull --ff-only origin main
    git fetch --prune origin
    base_sha="$(git rev-parse HEAD)"
    [[ "$base_sha" == "$(git rev-parse origin/main)" ]] || die 'Local main contains unpublished commits.'
    require_clean
    git switch -c "$branch"
    node "$support_dir/recover.mjs" init "$issue_dir" "$root"
    printf '%s\n' "$issue" > "$run_dir/current-issue"
  else
    [[ -z "$(git ls-remote --heads origin "refs/heads/$branch")" ]] || die 'Resume branch was published externally; inspect its PR before continuing'
    resume_dir=''
  fi
  {
    printf 'Selected issue: #%s\nRepository: %s\nPrepared branch: %s\nBase commit: %s\nRead-only context directory: %s\n\n' "$issue" "$repo" "$branch" "$base_sha" "$issue_dir"
    cat "$support_dir/prompt.md"
  } > "$issue_dir/prompt.md"
  printf '\nImplementing #%s on %s\n' "$issue" "$branch"
  node "$support_dir/recover.mjs" run "$issue_dir" "$root" "${codex_args[@]}"
  [[ "$(git branch --show-current)" == "$branch" && "$(git rev-parse HEAD)" == "$base_sha" ]] || die 'Codex changed the branch or committed unexpectedly.'
  node "$support_dir/verify.mjs" result "$issue_dir/result.json" "$issue_dir/files.list"
  git diff --check
  mapfile -d '' -t changed_files < "$issue_dir/files.list"
  title="$(field pr_title < "$issue_dir/result.json")"
  field pr_body < "$issue_dir/result.json" > "$issue_dir/pr-body.md"
  node -e 'const fs=require("node:fs"); const checks=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); console.log("\nController validation:"); for(const check of checks) console.log("- "+[check.command,...check.args].join(" ")+": exit "+check.code);' "$issue_dir/validation.json" >> "$issue_dir/pr-body.md"
  printf '\n\nCloses #%s\n' "$issue" >> "$issue_dir/pr-body.md"
  node "$support_dir/recover.mjs" delivery "$issue_dir" "$root"
  git add -- "${changed_files[@]}"
  git diff --cached --check
  git commit -m "$title"
  head_sha="$(git rev-parse HEAD)"
  require_clean
  git push -u origin "$branch"
  gh pr create --repo "$repo" --base main --head "$branch" --title "$title" --body-file "$issue_dir/pr-body.md" > "$issue_dir/pr-url.txt"
  pr_url="$(cat "$issue_dir/pr-url.txt")"
  printf 'PR: %s\n' "$pr_url"
  deadline=$((SECONDS + timeout_seconds))
  merge_requested=false
  while :; do
    gh pr view "$pr_url" --repo "$repo" --json state,isDraft,headRefOid,headRefName,baseRefName,mergeable,mergeStateStatus,reviewDecision,statusCheckRollup,mergeCommit > "$issue_dir/pr.json"
    state="$(node "$support_dir/verify.mjs" pr "$issue_dir/pr.json" "$head_sha" "$branch")"
    [[ "$state" != merged ]] || break
    ((SECONDS < deadline)) || die "Timed out waiting for $pr_url"
    if [[ "$state" == ready ]] && ! "$merge_requested"; then
      require_clean
      [[ "$(git rev-parse HEAD)" == "$head_sha" && "$(git branch --show-current)" == "$branch" ]] || die 'Local branch changed after validation.'
      gh pr merge "$pr_url" --repo "$repo" --squash --match-head-commit "$head_sha"
      merge_requested=true
    else
      printf 'Waiting for GitHub checks/merge: %s\n' "$pr_url"
      remaining=$((deadline - SECONDS))
      sleep "$((remaining < 10 ? remaining : 10))"
    fi
  done
  require_clean
  [[ "$(git rev-parse "$branch")" == "$head_sha" ]] || die 'Branch gained commits after the PR was merged.'
  git switch main
  git pull --ff-only origin main
  merge_sha="$(field mergeCommit.oid < "$issue_dir/pr.json")"
  git merge-base --is-ancestor "$merge_sha" HEAD || die 'Merged commit is missing from local main.'
  [[ "$(gh issue view "$issue" --repo "$repo" --json state --jq .state)" == CLOSED ]] || die "Issue #$issue did not close after merge."
  remote_head="$(git ls-remote --heads origin "refs/heads/$branch")"
  if [[ -n "$remote_head" ]]; then
    [[ "${remote_head%%$'\t'*}" == "$head_sha" ]] || die 'Remote branch gained commits; preserving it.'
    git push --force-with-lease="refs/heads/$branch:$head_sha" origin --delete "$branch"
  fi
  # Squash does not preserve ancestry; the merged PR's exact head was verified above.
  git branch -D "$branch"
  git fetch --prune origin
  require_clean
  printf '#%s merged; main is clean.\n' "$issue"
done
