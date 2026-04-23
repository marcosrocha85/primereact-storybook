type TokenSwatchProps = {
  label: string;
  value: string;
  usage: string;
};

export function TokenSwatch({ label, value, usage }: TokenSwatchProps) {
  return (
    <article className="token-swatch">
      <div className="token-swatch__paint" style={{ background: value }} />
      <h3>{label}</h3>
      <p>{usage}</p>
      <code>{value}</code>
    </article>
  );
}
