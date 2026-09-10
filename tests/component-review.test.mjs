import assert from 'node:assert/strict';
import { test, before, after } from 'node:test';
import fs from 'node:fs';
import { chromium } from 'playwright';

const baseURL = process.env.STORYBOOK_URL ?? 'http://127.0.0.1:6006';
const components = fs.readdirSync('src/stories/components').filter((file) => file.endsWith('.stories.tsx')).map((file) => file.replace('.stories.tsx', ''));
let browser;
let page;
before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  page.setDefaultTimeout(5000);
  page.setDefaultNavigationTimeout(30000);
});
after(async () => { await browser?.close(); });

async function open(name, args = '') {
  await page.goto(`${baseURL}/iframe.html?id=components-${name.toLowerCase()}--default&viewMode=story${args ? `&args=${encodeURIComponent(args)}` : ''}`);
  await page.locator('#storybook-root .sakai-storybook-frame > *').first().waitFor({ state: 'attached' });
}

for (const name of components) {
  test(`${name}: only Summary and Default, renders at desktop and mobile`, async () => {
    const index = await (await fetch(`${baseURL}/index.json`)).json();
    const entries = Object.values(index.entries).filter((entry) => entry.title === `Components/${name}` || entry.title === `Components/${name}/Summary`);
    assert.equal(entries.filter((entry) => entry.type === 'story').length, 1);
    assert.equal(entries.find((entry) => entry.type === 'story').name, 'Default');
    const docs = entries.find((entry) => entry.type === 'docs');
    assert.ok(docs, 'Summary is indexed');
    const errors = [];
    const collect = (error) => errors.push(error.message);
    page.on('pageerror', collect);
    try {
      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await open(name);
        assert.equal(await page.locator('.sb-errordisplay').isVisible(), false);
        await page.goto(`${baseURL}/iframe.html?id=${docs.id}&viewMode=docs`);
        await page.locator('.sbdocs-content h1').waitFor();
        assert.deepEqual(await page.locator('.sbdocs-content h2:not(.sbdocs-subtitle)').allTextContents(), ['Usage', 'Variations', 'Playground']);
        assert.equal(await page.locator('.docblock-argstable').count(), 0, 'Summary has no Controls');
        assert.ok(await page.locator('.docblock-source').count() > 0, 'Copyable source exists');
        assert.equal(await page.locator('.sb-errordisplay').isVisible(), false);
        const brokenImages = await page.locator('.sbdocs-content img').evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
        assert.deepEqual(brokenImages, [], 'Example assets load');
        const iconFonts = await page.locator('.component-example .pi').evaluateAll((icons) => icons.map((icon) => getComputedStyle(icon).fontFamily));
        assert.ok(iconFonts.every((font) => font.includes('primeicons')), 'Documentation typography preserves PrimeIcons');
      }
      assert.deepEqual(errors, [], 'No runtime exceptions');
    } finally { page.off('pageerror', collect); }
  });
}

test('Dialog: open, close and reopen at desktop and mobile widths', async () => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await open('Dialog');
    const root = page.locator('#storybook-root');
    const dialog = page.locator('.p-dialog');
    assert.equal(await dialog.count(), 0, 'Dialog starts closed');
    await root.getByRole('button', { name: 'Open Dialog' }).click();
    await dialog.waitFor();
    assert.equal(await dialog.getByText('Dialog content.').count(), 1);
    await dialog.getByRole('button', { name: 'Close' }).click();
    await dialog.waitFor({ state: 'detached' });
    await root.getByRole('button', { name: 'Open Dialog' }).click();
    await dialog.waitFor();
  }
});

test('Calendar: Sakai variations, date Controls, formatting and reset', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-calendar-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Floating label', 'Invalid state', 'Disabled']);
  const stages = preview.locator('.component-example');
  const inputs = stages.getByRole('combobox', { name: 'Date', exact: true });
  assert.equal(await inputs.count(), 4, 'Each example has an associated label');
  const ids = await inputs.evaluateAll(elements => elements.map(element => element.id));
  assert.equal(new Set(ids).size, 4, 'Summary instances have unique input IDs');
  assert.equal(await stages.nth(1).locator('.p-float-label').count(), 1);
  assert.equal(await stages.nth(1).locator('.p-datepicker-trigger').count(), 0);
  assert.equal(await inputs.nth(2).getAttribute('aria-invalid'), 'true');
  assert.equal(await stages.nth(2).locator('.p-calendar.p-invalid').count(), 1);
  assert.equal(await inputs.nth(3).isDisabled(), true);
  assert.equal(await stages.nth(3).getByRole('button', { name: 'Choose Date' }).isDisabled(), true);
  await inputs.nth(1).fill('09/15/2026');
  await inputs.nth(1).press('Tab');
  assert.equal(await inputs.nth(1).inputValue(), '09/15/2026');
  assert.equal(await inputs.first().inputValue(), '', 'Summary state is independent');
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  const input = preview.locator('#storybook-root').getByRole('combobox', { name: 'Date', exact: true });
  await input.waitFor();
  assert.equal(await preview.locator('#storybook-root .p-calendar').count(), 1);
  await page.getByRole('tab', { name: 'Controls' }).click();
  const dateControl = page.locator('#control-value-date');
  await dateControl.fill('2026-09-15');
  await dateControl.press('Tab');
  await page.waitForFunction(() => document.querySelector('#storybook-preview-iframe')?.contentDocument?.querySelector('input')?.value === '09/15/2026');
  for (const [format, expected] of [['dd/mm/yy', '15/09/2026'], ['yy-mm-dd', '2026-09-15'], ['mm/dd/yy', '09/15/2026']]) {
    await page.locator('#control-dateFormat').selectOption({ label: format });
    await page.waitForFunction(value => document.querySelector('#storybook-preview-iframe')?.contentDocument?.querySelector('input')?.value === value, expected);
  }
  await input.fill('09/20/2026');
  await input.press('Tab');
  await page.waitForFunction(() => document.querySelector('#control-value-date')?.value === '2026-09-20');
  await preview.getByRole('button', { name: 'Choose Date' }).click();
  await preview.locator('.p-datepicker-calendar td:not(.p-datepicker-other-month) > span:not(.p-disabled)').filter({ hasText: /^18$/ }).click();
  await page.waitForFunction(() => document.querySelector('#control-value-date')?.value === '2026-09-18');
  await preview.getByRole('button', { name: 'Choose Date' }).click();
  await preview.getByRole('button', { name: 'Clear', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#control-value-date')?.value === '');
  assert.equal(await input.inputValue(), '');
  await preview.getByRole('button', { name: 'Choose Date' }).click();
  await preview.getByRole('button', { name: 'Today', exact: true }).click();
  const today = await preview.locator('body').evaluate(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });
  await page.waitForFunction(value => document.querySelector('#control-value-date')?.value === value, today);
  await page.locator('#control-floatLabel').focus();
  await page.locator('#control-floatLabel').press('Space');
  await preview.locator('.p-float-label .p-calendar').waitFor();
  assert.equal(await input.getAttribute('placeholder'), null, 'Floating label does not overlap a placeholder');
  await page.locator('#control-invalid').focus();
  await page.locator('#control-invalid').press('Space');
  await preview.locator('.p-calendar.p-invalid input[aria-invalid="true"]').waitFor();
  await page.locator('#control-disabled').focus();
  await page.locator('#control-disabled').press('Space');
  await preview.locator('input:disabled').waitFor();
  assert.equal(await preview.getByRole('button', { name: 'Choose Date' }).isDisabled(), true);
  await page.getByRole('button', { name: 'Reset controls', exact: true }).click();
  await preview.locator('input:not(:disabled)[aria-invalid="false"]').waitFor();
  await preview.locator('.p-float-label').waitFor({ state: 'detached' });
  assert.equal(await input.inputValue(), '');
  assert.equal(await dateControl.inputValue(), '');
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.getByRole('button', { name: /Copy/ }).waitFor();
  assert.match(await page.getByRole('tabpanel').innerText(), /value=\{selectedDate\}/);
  assert.match(await page.getByRole('tabpanel').innerText(), /calendarProps\.onChange\?\.\(event\)/);
});

test('BreadCrumb: hierarchy, optional Home, disabled items, Controls and code', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-breadcrumb-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Without Home', 'Disabled item']);
  const stages = preview.locator('.component-example');
  assert.equal(await stages.count(), 3);
  assert.deepEqual(await stages.first().locator('.p-menuitem-text').allTextContents(), ['Home', 'Computer', 'Notebook', 'Accessories', 'Backpacks', 'Item']);
  assert.equal(await stages.nth(1).locator('.p-breadcrumb-home').count(), 0);
  await stages.first().getByRole('link', { name: 'Home', exact: true }).click();
  await stages.first().getByRole('status').filter({ hasText: 'Home selected' }).waitFor();
  assert.equal(await stages.nth(1).getByRole('status').innerText(), 'No action yet', 'Summary examples keep independent state');
  const disabled = stages.nth(2).getByRole('link', { name: 'Notebook', exact: true });
  assert.equal(await disabled.getAttribute('aria-disabled'), 'true');
  assert.equal(await disabled.getAttribute('tabindex'), '-1');
  await disabled.dispatchEvent('click');
  assert.equal(await stages.nth(2).getByRole('status').innerText(), 'No action yet', 'Disabled items do not run commands');
  await stages.nth(2).getByRole('link', { name: 'Computer', exact: true }).focus();
  await stages.nth(2).getByRole('link', { name: 'Computer', exact: true }).press('Enter');
  await stages.nth(2).getByRole('status').filter({ hasText: 'Computer selected' }).waitFor();
  for (const source of await preview.locator('.docblock-source').all()) {
    assert.match(await source.innerText(), /item\.command\?\.\(event\)/, 'Copyable examples preserve supplied commands');
  }
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-breadcrumb').waitFor();
  assert.equal(await preview.locator('#storybook-root .p-breadcrumb').count(), 1);
  await page.getByRole('tab', { name: 'Controls' }).click();
  await page.locator('#control-className').fill('breadcrumb-control-check');
  await preview.locator('.p-breadcrumb.breadcrumb-control-check').waitFor();
  await page.getByRole('switch', { name: 'Edit model as JSON' }).click();
  const modelRow = page.getByRole('row').filter({ has: page.getByText('model', { exact: true }) });
  await modelRow.getByRole('textbox').fill('[{"label":"Devices"},{"label":"Item","disabled":true}]');
  await modelRow.getByRole('textbox').press('Tab');
  await preview.getByRole('link', { name: 'Devices', exact: true }).waitFor();
  assert.equal(await preview.locator('.p-menuitem-text').count(), 3, 'Model Controls change path content and depth');
  assert.equal(await preview.getByRole('link', { name: 'Item', exact: true }).getAttribute('aria-disabled'), 'true');
  await page.getByRole('button', { name: 'Reset controls', exact: true }).click();
  await preview.getByRole('link', { name: 'Backpacks', exact: true }).waitFor();
  await page.locator('#control-showHome').focus();
  await page.locator('#control-showHome').press('Space');
  await preview.locator('.p-breadcrumb-home').waitFor({ state: 'detached' });
  assert.equal(await preview.locator('.p-menuitem-text').count(), 5, 'Hiding Home preserves all path levels');
  await page.getByRole('button', { name: 'Reset controls', exact: true }).click();
  await preview.getByRole('link', { name: 'Home', exact: true }).waitFor();
  await preview.locator('.breadcrumb-control-check').waitFor({ state: 'detached' });
  await preview.getByRole('link', { name: 'Home', exact: true }).click();
  await preview.getByRole('status').filter({ hasText: 'Home selected' }).waitFor();
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.getByRole('button', { name: /Copy/ }).waitFor();
  assert.match(await page.getByRole('tabpanel').innerText(), /home=\{showHome && home \? withAction\(home\) : undefined\}/);

  await page.getByRole('tab', { name: 'Controls' }).click();
  await page.getByRole('switch', { name: 'Edit home as JSON' }).click();
  const homeRow = page.getByRole('row').filter({ has: page.getByText('home', { exact: true }) });
  await homeRow.getByRole('textbox').fill('{"label":"Start"}');
  await homeRow.getByRole('textbox').press('Tab');
  await preview.getByRole('link', { name: 'Start', exact: true }).click();
  await preview.getByRole('status').filter({ hasText: 'Start selected' }).waitFor();
  await preview.getByRole('link', { name: 'Computer', exact: true }).click();
  await preview.getByRole('status').filter({ hasText: 'Computer selected' }).waitFor();
  await homeRow.getByRole('textbox').fill('{"label":"Start","url":"#start"}');
  await homeRow.getByRole('textbox').press('Tab');
  await preview.locator('.p-breadcrumb-home a[href="#start"]').waitFor();
});

test('Badge: Sakai variations, composition Controls and code', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-badge-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Numbers and severities', 'Positioned badges', 'Button badges', 'Sizes']);
  assert.equal(await preview.locator('.component-example .p-overlay-badge').count(), 3);
  assert.equal(await preview.locator('.component-example .p-badge-dot').count(), 1);
  await preview.getByRole('button', { name: 'Emails' }).click();
  await preview.getByRole('status').filter({ hasText: 'Emails opened' }).waitFor();
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-badge').waitFor();
  await page.getByRole('tab', { name: 'Controls' }).click();
  await page.locator('#control-value').fill('10+');
  await preview.locator('.p-badge').filter({ hasText: '10+' }).waitFor();
  for (const severity of ['success', 'info', 'warning', 'danger']) {
    await page.locator('#control-severity').selectOption({ label: severity });
    await preview.locator(`.p-badge-${severity}`).waitFor();
  }
  for (const [size, className] of [['large', 'lg'], ['xlarge', 'xl']]) {
    await page.locator('#control-size').selectOption({ label: size });
    await preview.locator(`.p-badge-${className}`).waitFor();
  }
  await page.locator('#control-placement').selectOption({ label: 'icon' });
  await preview.locator('.p-overlay-badge .p-badge').waitFor();
  assert.equal(await page.locator('#control-size').count(), 0, 'Oversized badges are not offered for icon overlays');
  assert.equal(await preview.locator('.p-badge-lg, .p-badge-xl').count(), 0, 'Previously selected size cannot leak into icon overlays');
  await page.locator('#control-value').fill('');
  await preview.locator('.p-badge-dot').waitFor();
  for (const icon of ['pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill']) {
    await page.locator('#control-icon').selectOption({ label: icon });
    const glyph = preview.locator(`.p-overlay-badge .${icon.split(' ')[1]}`);
    await glyph.waitFor();
    const iconBox = await glyph.boundingBox();
    const badgeBox = await preview.locator('.p-badge-dot').boundingBox();
    assert.ok(iconBox && badgeBox);
    assert.ok(badgeBox.width < iconBox.width / 2, 'Dot remains smaller than the icon');
    assert.ok(Math.abs(badgeBox.x + badgeBox.width / 2 - (iconBox.x + iconBox.width)) < 2, 'Badge is anchored to the right edge');
    assert.ok(Math.abs(badgeBox.y + badgeBox.height / 2 - iconBox.y) < 2, 'Badge is anchored to the top edge');
  }
  await page.locator('#control-icon').selectOption({ label: 'undefined' });
  await preview.locator('.p-overlay-badge').waitFor({ state: 'detached' });
  assert.equal(await preview.locator('#storybook-root .p-badge').count(), 1, 'No-icon option renders a standalone badge');
  await page.locator('#control-placement').selectOption({ label: 'button' });
  await page.locator('#control-size').waitFor();
  await preview.locator('.p-button .p-badge-xl').waitFor();
  await preview.getByRole('button', { name: 'Notifications' }).click();
  await preview.getByRole('status').filter({ hasText: 'Notifications opened' }).waitFor();
  assert.equal(await preview.locator('#storybook-root .p-badge').count(), 1);
  await page.locator('#control-placement').selectOption({ label: 'standalone' });
  await preview.locator('.p-button').waitFor({ state: 'detached' });
  assert.equal(await preview.locator('#storybook-root .p-badge').count(), 1);
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.getByRole('button', { name: /Copy/ }).waitFor();
  assert.match(await page.getByRole('tabpanel').innerText(), /<Badge \{\.\.\.badgeProps\}/);
});

test('AvatarGroup: curated compositions, Controls and copyable code', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-avatargroup-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Initials', 'Sizes']);
  const groups = preview.locator('.component-example .p-avatar-group');
  assert.equal(await groups.count(), 4);
  assert.equal(await groups.first().locator('img').count(), 5);
  assert.equal(await groups.first().getByLabel('2 additional members').innerText(), '+2');
  assert.equal(await groups.last().locator('.p-avatar-xl').count(), 3);
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-avatar-group').waitFor();
  assert.equal(await preview.locator('#storybook-root .p-avatar-group').count(), 1);
  await page.getByRole('tab', { name: 'Controls' }).click();
  await page.locator('#control-className').fill('avatargroup-control-check');
  await preview.locator('.p-avatar-group.avatargroup-control-check').waitFor();
  const group = preview.locator('#storybook-root .p-avatar-group');
  for (const count of [2, 3, 4, 5]) {
    await page.locator('#control-count').selectOption({ label: String(count) });
    await group.locator('.p-avatar').nth(count).waitFor();
    await group.locator('.p-avatar').nth(count + 1).waitFor({ state: 'detached' });
    assert.equal(await group.locator('.p-avatar').count(), count + 1);
  }
  await page.locator('#control-content').selectOption({ label: 'text' });
  await group.locator('img').first().waitFor({ state: 'detached' });
  assert.deepEqual(await group.locator('.p-avatar-text').allTextContents(), ['AE', 'AJ', 'OL', 'IB', 'XF', '+2']);
  await page.locator('#control-content').selectOption({ label: 'mixed' });
  await group.locator('img').nth(2).waitFor();
  assert.equal(await group.locator('img').count(), 3);
  assert.deepEqual(await group.locator('.p-avatar-text').allTextContents(), ['AJ', 'IB', '+2']);
  await page.locator('#control-content').selectOption({ label: 'image' });
  await group.locator('img').nth(4).waitFor();
  assert.equal(await group.locator('img').count(), 5);
  await page.locator('#control-showOverflow').focus();
  await page.locator('#control-showOverflow').press('Space');
  await group.getByLabel('2 additional members').waitFor({ state: 'detached' });
  assert.equal(await group.locator('.p-avatar').count(), 5);
  await page.locator('#control-size').selectOption({ label: 'xlarge' });
  await group.locator('.p-avatar-xl').nth(4).waitFor();
  await page.getByLabel('square', { exact: true }).focus();
  await page.getByLabel('square', { exact: true }).press('Space');
  await group.locator('.p-avatar-circle').first().waitFor({ state: 'detached' });
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.getByRole('button', { name: /Copy/ }).waitFor();
  assert.match(await page.getByRole('tabpanel').innerText(), /<AvatarGroup \{\.\.\.groupProps\}/);
  assert.match(await page.getByRole('tabpanel').innerText(), /demo\/images\/avatar\/amyelsner.png/);
});

test('Avatar: curated Sakai variations and playground code', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-avatar-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Shapes', 'Sizes', 'Colors', 'Icons', 'Icon with badge']);
  const stages = preview.locator('.component-example');
  assert.equal(await stages.locator('.pi-user').count(), 2);
  assert.equal(await stages.locator('.p-overlay-badge .p-badge').innerText(), '4');
  assert.deepEqual(await stages.locator('.p-avatar[style]').evaluateAll((avatars) => avatars.map((avatar) => getComputedStyle(avatar).backgroundColor)), ['rgb(33, 150, 243)', 'rgb(156, 39, 176)']);
  assert.match(await preview.locator('.docblock-source').last().innerText(), /<Badge value="4"/);
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-avatar').waitFor();
  assert.equal(await preview.locator('#storybook-root .p-avatar').count(), 1);
  await open('Avatar', 'label:V;shape:square;size:xlarge');
  assert.equal(await page.locator('.p-avatar-text').innerText(), 'V');
  assert.equal(await page.locator('.p-avatar.p-avatar-xl:not(.p-avatar-circle)').count(), 1);
  await page.goto(`${baseURL}/?path=/story/components-avatar--default`);
  await page.getByRole('tab', { name: 'Controls' }).click();
  await page.getByRole('textbox').first().waitFor();
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.getByRole('button', { name: /Copy/ }).waitFor();
  assert.match(await page.getByRole('tabpanel').innerText(), /<Avatar \{\.\.\.args\}/);
});

test('icon Controls select and clear PrimeIcons like Button', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const name of ['Avatar', 'Chip', 'SplitButton', 'Tag']) {
    await page.goto(`${baseURL}/?path=/story/components-${name.toLowerCase()}--default`);
    await page.getByRole('tab', { name: 'Controls' }).click();
    if (name === 'Avatar') await page.locator('#control-label').fill('');
    const icon = page.locator('#control-icon');
    await icon.waitFor();
    assert.deepEqual(await icon.locator('option').allTextContents(), ['Choose option...', 'undefined', 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill']);
    await icon.selectOption({ label: 'pi pi-search' });
    const preview = page.frameLocator('#storybook-preview-iframe');
    await preview.locator('#storybook-root .pi-search').waitFor();
    await icon.selectOption({ label: 'undefined' });
    await preview.locator('#storybook-root .pi-search').waitFor({ state: 'hidden' });
  }
});

test('boolean inputs respond to clicks and keyboard, and respect disabled', async () => {
  for (const name of ['Checkbox', 'InputSwitch', 'ToggleButton', 'RadioButton']) {
    await open(name, 'checked:!false');
    const input = page.locator('input');
    await input.click({ force: true });
    await page.waitForFunction(() => document.querySelector('input')?.checked === true);
    if (name !== 'RadioButton') {
      await input.focus();
      await page.keyboard.press('Space');
      await page.waitForFunction(() => document.querySelector('input')?.checked === false);
    }
    await open(name, 'disabled:!true');
    assert.equal(await page.locator('input').isDisabled(), true);
  }
});

test('text fields retain edits', async () => {
  for (const name of ['InputText', 'InputTextarea', 'Password']) {
    await open(name);
    const input = page.locator('input, textarea').first();
    await input.fill('Updated content');
    await page.waitForFunction(() => document.querySelector('input, textarea')?.value === 'Updated content');
    await input.fill('');
    await page.waitForFunction(() => document.querySelector('input, textarea')?.value === '');
  }
});

test('Dialog and Sidebar open, dismiss and reopen', async () => {
  for (const name of ['Dialog', 'Sidebar']) {
    await open(name);
    const panel = page.locator(name === 'Dialog' ? '.p-dialog' : '.p-sidebar');
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button', { name: `Open ${name}`, exact: true }).click();
      await panel.waitFor({ state: 'visible' });
      await panel.getByRole('button', { name: 'Close', exact: true }).click();
      await panel.waitFor({ state: 'hidden' });
    }
  }
});

test('OverlayPanel opens and dismisses', async () => {
  await open('OverlayPanel');
  await page.getByRole('button', { name: 'Show overlay' }).click();
  await page.locator('.p-overlaypanel').waitFor();
  await page.locator('.p-overlaypanel-close').click();
  await page.locator('.p-overlaypanel').waitFor({ state: 'hidden' });
});

test('ConfirmPopup accepts and rejects', async () => {
  await open('ConfirmPopup');
  for (const [button, result] of [['Yes', 'Accepted'], ['No', 'Rejected']]) {
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await page.locator('.p-confirm-popup').getByRole('button', { name: button, exact: true }).click();
    await page.getByRole('status').filter({ hasText: result }).waitFor();
    await page.locator('.p-confirm-popup').waitFor({ state: 'hidden' });
  }
});

test('ConfirmPopup dismisses with Escape and preserves supplied callbacks', async () => {
  const source = await fs.promises.readFile('src/stories/components/ConfirmPopup.examples.tsx', 'utf8');
  assert.match(source, /args\.onHide\?\.\(result\)/);
  assert.match(source, /args\.accept\?\.\(\)/);
  assert.match(source, /args\.reject\?\.\(\)/);
  await open('ConfirmPopup');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await page.locator('.p-confirm-popup').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.locator('.p-confirm-popup').waitFor({ state: 'hidden' });
});

test('Toast and Messages show and clear feedback', async () => {
  for (const name of ['Toast', 'Messages']) {
    await open(name);
    await page.getByRole('button', { name: `Show ${name.toLowerCase()}`, exact: true }).click();
    await page.getByText('Action completed', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Clear', exact: true }).click();
    await page.getByText('Action completed', { exact: true }).waitFor({ state: 'hidden' });
  }
});

test('popup menus and ContextMenu have working mouse and keyboard triggers', async () => {
  for (const name of ['Menu', 'TieredMenu']) {
    await open(name, 'popup:!true');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('.p-menu-overlay, .p-tieredmenu-overlay').waitFor();
    await page.keyboard.press('Escape');
    await page.locator('.p-menu-overlay, .p-tieredmenu-overlay').waitFor({ state: 'hidden' });
  }
  await open('ContextMenu');
  const target = page.getByText('Right-click or press Shift+F10 here');
  await target.click({ button: 'right' });
  await page.getByRole('menubar').waitFor();
  await page.getByRole('menuitem', { name: 'Save' }).click();
  await page.getByRole('status').filter({ hasText: 'Save selected' }).waitFor();
  await target.focus();
  await target.press('Shift+F10');
  await page.getByRole('menubar').waitFor();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('status').filter({ hasText: 'Delete selected' }).waitFor();
});

test('PickList transfers items and OrderList reorders them', async () => {
  await open('PickList');
  await page.getByRole('option', { name: 'Bamboo Watch' }).click();
  await page.getByRole('button', { name: 'Move to Target', exact: true }).click();
  await page.getByRole('listbox').nth(1).getByRole('option', { name: 'Bamboo Watch' }).waitFor();
  assert.doesNotMatch(await page.getByRole('listbox').nth(0).innerText(), /Bamboo Watch/);
  await open('OrderList');
  await page.getByRole('option', { name: 'Black Watch' }).click();
  await page.getByRole('button', { name: 'Move Up', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('[role="option"]')?.textContent === 'Black Watch');
});

test('tab controls and Steps update their selection', async () => {
  for (const name of ['TabView', 'TabMenu']) {
    await open(name);
    if (name === 'TabView') {
      await page.getByRole('tab').nth(1).click();
      await page.waitForFunction(() => document.querySelectorAll('[role="tab"]')[1]?.getAttribute('aria-selected') === 'true');
    } else {
      await page.getByRole('menuitem').nth(1).click();
      await page.locator('.p-tabmenuitem.p-highlight').filter({ hasText: 'Calendar' }).waitFor();
    }
  }
  await open('Steps');
  await page.getByText('Seat', { exact: true }).click();
  await page.locator('.p-steps-item.p-highlight').filter({ hasText: 'Seat' }).waitFor();
});

test('selection inputs retain selected options and clear values', async () => {
  await open('Dropdown');
  await page.locator('.p-dropdown-trigger').click();
  await page.getByRole('option', { name: 'Rome', exact: true }).click();
  await page.locator('.p-dropdown-label').filter({ hasText: 'Rome' }).waitFor();
  await open('MultiSelect');
  await page.locator('.p-multiselect-trigger').click();
  await page.getByRole('option', { name: 'Brazil', exact: true }).click();
  await page.keyboard.press('Escape');
  await page.locator('.p-multiselect-token').filter({ hasText: 'Brazil' }).waitFor();
  await open('ListBox');
  await page.getByRole('option', { name: 'Rome', exact: true }).click();
  await page.getByRole('option', { name: 'Rome', exact: true, selected: true }).waitFor();
  await open('SelectButton');
  await page.getByRole('button', { name: 'Option 2', exact: true }).click();
  await page.getByRole('button', { name: 'Option 2', pressed: true }).waitFor();
});

test('AutoComplete filters, selects, and supports multiple values', async () => {
  for (const multiple of [false, true]) {
    await open('AutoComplete', multiple ? 'multiple:!true' : '');
    const input = page.getByRole('combobox');
    await input.fill('Bra');
    await page.getByRole('option', { name: 'Brazil', exact: true }).click();
    if (multiple) await page.locator('.p-autocomplete-token').filter({ hasText: 'Brazil' }).waitFor();
    else await page.waitForFunction(() => document.querySelector('input')?.value === 'Brazil');
  }
});

test('Calendar: selects and clears a date', async () => {
  await open('Calendar');
  await page.locator('.p-datepicker-trigger').click();
  await page.locator('.p-datepicker-calendar td:not(.p-datepicker-other-month) > span:not(.p-disabled)').filter({ hasText: /^15$/ }).click();
  await page.waitForFunction(() => Boolean(document.querySelector('input')?.value));
  await page.locator('.p-datepicker-trigger').click();
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('input')?.value === '');
});

test('InputNumber supports currency', async () => {
  await open('InputNumber', 'mode:currency');
  await page.getByRole('spinbutton').fill('125');
  await page.getByRole('spinbutton').press('Tab');
  assert.match(await page.getByRole('spinbutton').inputValue(), /125/);
});

test('Chips adds/removes tokens and InputMask retains formatted input', async () => {
  await open('Chips');
  const input = page.locator('input');
  await input.fill('First');
  await input.press('Enter');
  await page.locator('.p-chips-token').filter({ hasText: 'First' }).waitFor();
  const chip = page.locator('.p-chips-token').filter({ hasText: 'First' }).first();
  const label = chip.locator('.p-chips-token-label');
  const icon = chip.locator('.p-chips-token-icon');
  const labelBounds = await label.boundingBox();
  const iconBounds = await icon.boundingBox();
  assert.ok(labelBounds && iconBounds, 'Chip label and remove icon are visible');
  assert.equal(Math.abs((labelBounds.y + labelBounds.height / 2) - (iconBounds.y + iconBounds.height / 2)) < 3, true, 'Chip label and remove icon are aligned');
  assert.equal(await label.isVisible(), true);
  await icon.click();
  await chip.waitFor({ state: 'hidden' });
  await input.fill('Second');
  await input.press('Enter');
  await page.locator('.p-chips-token-label').filter({ hasText: 'Second' }).waitFor();
  await input.press('Backspace');
  await page.locator('.p-chips-token').filter({ hasText: 'Second' }).waitFor({ state: 'hidden' });
  await open('InputMask');
  await page.locator('input').fill('09062026');
  await page.locator('input').press('Tab');
  await page.waitForFunction(() => document.querySelector('input')?.value === '09/06/2026');
});

test('Slider, Knob, Rating and ColorPicker accept changes', async () => {
  for (const name of ['Slider', 'Knob']) {
    await open(name);
    const slider = page.getByRole('slider');
    const before = await slider.getAttribute('aria-valuenow');
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction((value) => document.querySelector('[role="slider"]')?.getAttribute('aria-valuenow') !== value, before);
  }
  await open('Rating', 'cancel:!true');
  await page.locator('.p-rating-item').last().click();
  await page.waitForFunction(() => document.querySelectorAll('.p-rating-item-active').length === 5);
  await page.locator('.p-rating-cancel-item').click();
  await page.waitForFunction(() => document.querySelectorAll('.p-rating-item-active').length === 0);
  await open('ColorPicker');
  await page.locator('.p-colorpicker-preview').click();
  const hue = page.locator('.p-colorpicker-hue');
  await hue.click({ position: { x: 5, y: 50 } });
  await page.locator('.p-colorpicker-color-selector').click({ position: { x: 60, y: 60 } });
  await page.keyboard.press('Escape');
});

test('Accordion and Panel synchronize controlled expansion', async () => {
  await open('Accordion');
  await page.getByRole('button', { name: 'Header II', exact: true }).click();
  await page.getByRole('button', { name: 'Header II', expanded: true }).waitFor();
  await open('Accordion', 'multiple:!true');
  await page.getByRole('button', { name: 'Header II', exact: true }).click();
  await page.getByRole('button', { name: 'Header I', expanded: true }).waitFor();
  await page.getByRole('button', { name: 'Header II', expanded: true }).waitFor();
  for (const name of ['Panel', 'Fieldset']) {
    await open(name, 'toggleable:!true');
    const toggle = page.locator('[aria-expanded]').first();
    await toggle.click();
    await page.waitForFunction(() => document.querySelector('[aria-expanded]')?.getAttribute('aria-expanded') === 'false');
    await toggle.click();
    await page.waitForFunction(() => document.querySelector('[aria-expanded]')?.getAttribute('aria-expanded') === 'true');
  }
});

test('DataTable sorts, paginates, filters and selects; trees expand and select', async () => {
  await open('DataTable');
  await page.getByRole('columnheader', { name: /^Name/ }).click();
  await page.locator('th[aria-sort="ascending"]').waitFor();
  await page.locator('.p-paginator-next').click();
  await page.locator('.p-datatable-tbody tr').filter({ hasText: 'Black Watch' }).waitFor();
  await page.locator('.p-datatable-tbody tr').first().click();
  await page.locator('.p-datatable-tbody tr[aria-selected="true"]').waitFor();
  await page.locator('.p-column-filter-menu-button').click();
  await page.locator('.p-column-filter-overlay input:not([readonly])').fill('Bamboo');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await page.locator('.p-datatable-tbody tr').filter({ hasText: 'Bamboo Watch' }).waitFor();
  for (const name of ['Tree', 'TreeTable']) {
    await open(name);
    await page.locator(name === 'Tree' ? '.p-tree-toggler' : '.p-treetable-toggler').first().click();
    await page.getByText(name === 'Tree' ? 'Work' : 'React', { exact: true }).waitFor();
    await page.locator('input[type="checkbox"]').first().click({ force: true });
    await page.locator('input[type="checkbox"]:checked').first().waitFor({ state: 'attached' });
  }
});

test('FileUpload handles a local file without network uploads', async () => {
  await open('FileUpload', 'mode:advanced');
  const requests = [];
  const onRequest = (request) => { if (request.method() === 'POST') requests.push(request.url()); };
  page.on('request', onRequest);
  try {
    await page.locator('input[type="file"]').setInputFiles({ name: 'pixel.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64') });
    await page.getByRole('button', { name: 'Upload', exact: true }).click();
    await page.getByRole('status').filter({ hasText: '1 file(s) processed locally.' }).waitFor();
    assert.deepEqual(requests, []);
  } finally { page.off('request', onRequest); }
});

test('Image preview, Galleria, Carousel and Tooltip work', async () => {
  await open('Image');
  await page.locator('.p-image-preview-indicator').click();
  await page.locator('.p-image-mask').waitFor();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('.p-image-mask').waitFor({ state: 'hidden' });
  await open('Galleria');
  const src = await page.locator('.p-galleria-item img').getAttribute('src');
  await page.locator('.p-galleria-item-next').click();
  await page.waitForFunction((before) => document.querySelector('.p-galleria-item img')?.getAttribute('src') !== before, src);
  await open('Carousel');
  await page.locator('.p-carousel-next').click();
  await page.locator('.p-carousel-item-active').filter({ hasText: 'Black Watch' }).waitFor();
  await open('Tooltip');
  await page.getByRole('button', { name: 'Hover or focus me' }).focus();
  await page.getByRole('tooltip').waitFor();
  await page.keyboard.press('Tab');
  await page.getByRole('tooltip').waitFor({ state: 'hidden' });
});

test('Controls reflect interaction and reset it', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/story/components-checkbox--default`);
  const frame = page.frameLocator('#storybook-preview-iframe');
  const checkbox = frame.getByRole('checkbox');
  await checkbox.waitFor();
  await checkbox.click({ force: true });
  const row = page.getByRole('row').filter({ has: page.getByText('checked', { exact: true }) });
  await row.waitFor();
  const control = row.locator('label[aria-label="checked"]');
  await page.waitForFunction(() => [...document.querySelectorAll('tr')].find((row) => row.textContent.includes('checked'))?.querySelector('input[type="checkbox"]')?.checked === false);
  await control.click();
  await frame.locator('input[type="checkbox"]:checked').waitFor({ state: 'attached' });
  assert.equal(await checkbox.isChecked(), true);
  await control.click();
  await frame.locator('input[type="checkbox"]:not(:checked)').waitFor({ state: 'attached' });
  await page.getByRole('button', { name: 'Reset controls', exact: true }).click();
  await frame.locator('input[type="checkbox"]:checked').waitFor({ state: 'attached' });
});

test('menus and action buttons report the selected action', async () => {
  for (const [name, label] of [['Menu', 'Save'], ['Menubar', 'File'], ['BreadCrumb', 'Computer']]) {
    await open(name);
    await page.getByText(label, { exact: true }).click();
    await page.getByRole('status').filter({ hasText: `${label} selected` }).waitFor();
  }
  for (const name of ['PanelMenu', 'TieredMenu']) {
    await open(name);
    await page.getByText('Customers', { exact: true }).click();
    await page.getByText('New', { exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'New selected' }).waitFor();
  }
  await open('MegaMenu');
  await page.getByText('Videos', { exact: true }).click();
  await page.getByText('Video 1.1', { exact: true }).click();
  await page.getByRole('status').filter({ hasText: 'Video 1.1 selected' }).waitFor();
  for (const name of ['Toolbar', 'SplitButton']) {
    await open(name);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Save selected' }).waitFor();
  }
});

test('scroll containers, resizable panels and removable chips work', async () => {
  await open('ScrollTop');
  const container = page.locator('#storybook-root [style*="overflow: auto"]');
  await container.evaluate((element) => { element.scrollTop = 300; });
  await page.locator('.p-scrolltop').click();
  await page.waitForFunction(() => document.querySelector('#storybook-root [style*="overflow: auto"]')?.scrollTop === 0);
  await open('ScrollPanel');
  const content = page.locator('.p-scrollpanel-content');
  await content.evaluate((element) => { element.scrollTop = 200; });
  assert.ok(await content.evaluate((element) => element.scrollTop) > 0);
  await open('Splitter');
  const panel = page.locator('.p-splitter-panel').first();
  const before = await panel.evaluate((element) => element.getBoundingClientRect().width);
  const bounds = await page.locator('.p-splitter-gutter').boundingBox();
  assert.ok(bounds);
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 50, bounds.y + bounds.height / 2);
  await page.mouse.up();
  assert.ok(Math.abs(await panel.evaluate((element) => element.getBoundingClientRect().width) - before) > 20);
  await open('Chip', 'removable:!true');
  await page.locator('.p-chip-remove-icon').click();
  await page.locator('.p-chip').waitFor({ state: 'hidden' });
});

test('DataView paginates and Default exposes copyable Code', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-dataview-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['List layout', 'Grid layout', 'Pagination']);
  assert.equal(await preview.locator('.docblock-argstable').count(), 0);
  assert.equal(await preview.locator('.docblock-source').count(), 4);
  assert.equal(await preview.locator('.p-dataview-list').count(), 3);
  assert.equal(await preview.locator('.p-dataview-grid').count(), 1);
  await open('DataView');
  await page.getByText('Bamboo Watch', { exact: true }).waitFor();
  await page.locator('.p-paginator-next').click();
  await page.getByText('Black Watch', { exact: true }).waitFor();
  await page.getByText('Bamboo Watch', { exact: true }).waitFor({ state: 'hidden' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/story/components-checkbox--default`);
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.getByRole('button', { name: /Copy/ }).waitFor();
  assert.match(await page.getByRole('tabpanel').innerText(), /onChange/);
});

test('Card: composition Controls, copyable source and responsive slots', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-card-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Content only', 'Custom header', 'Title, subtitle, and footer']);
  assert.equal(await preview.locator('.component-example .p-card').count(), 4);
  assert.equal(await preview.locator('.docblock-argstable').count(), 0);
  assert.equal(await preview.locator('.docblock-source').count(), 4);
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-card').waitFor();
  await page.getByRole('tab', { name: 'Controls' }).click();
  for (const [control, selector, value] of [
    ['title', '.p-card-title', 'Edited title'],
    ['subTitle', '.p-card-subtitle', 'Edited subtitle'],
    ['contentText', '.p-card-content', 'Edited content'],
    ['headerText', '.p-card-header', 'Edited header'],
    ['footerText', '.p-card-footer', 'Edited footer'],
  ]) {
    await page.locator(`#control-${control}`).fill(value);
    await preview.locator(selector).filter({ hasText: value }).waitFor();
  }
  assert.equal(await preview.locator('#storybook-root .p-card').count(), 1);
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.locator('pre:visible').filter({ hasText: 'contentText' }).first().waitFor();
  await page.getByRole('tab', { name: 'Controls' }).click();
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const box = await preview.locator('.p-card').boundingBox();
    assert.ok(box && box.width > 0 && box.width <= width);
    await preview.locator('.p-card-header h5').waitFor();
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByRole('tab', { name: 'Controls' }).click();
  for (const [control, selector] of [['title', '.p-card-title'], ['subTitle', '.p-card-subtitle'], ['contentText', '.p-card-content'], ['headerText', '.p-card-header'], ['footerText', '.p-card-footer']]) {
    await page.locator(`#control-${control}`).fill('');
    await preview.locator(selector).waitFor({ state: 'detached' });
  }
});


test('Card: Default fits the mobile viewport with every section visible', async () => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await open('Card', 'headerText:Card header;footerText:Additional information');
    await page.locator('.p-card-header').waitFor();
    const box = await page.locator('.p-card').boundingBox();
    assert.ok(box && box.x >= 0 && box.x + box.width <= width);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  }
});

test('Carousel: page Controls synchronize navigation and reset with copyable source', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-carousel-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Responsive product collection', 'Circular navigation', 'Vertical layout']);
  assert.equal(await preview.locator('.component-example .p-carousel').count(), 4);
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-carousel').waitFor();
  await page.getByRole('tab', { name: 'Controls' }).click();
  await preview.locator('.p-carousel-next').click();
  await page.waitForFunction(() => document.querySelector('#control-page')?.value === '1');
  await preview.locator('.p-carousel-item-active').filter({ hasText: 'Black Watch' }).waitFor();
  await page.locator('#control-page').fill('2');
  await page.locator('#control-page').press('Tab');
  await preview.locator('.p-carousel-item-active').filter({ hasText: 'Blue Band' }).waitFor();
  await page.getByRole('button', { name: 'Reset controls' }).click();
  await preview.locator('.p-carousel-item-active').filter({ hasText: 'Bamboo Watch' }).waitFor();
  assert.equal(await preview.locator('#storybook-root .p-carousel').count(), 1);
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await page.locator('pre:visible').filter({ hasText: 'onPageChange' }).first().waitFor();
});

test('Carousel: circular, vertical, responsive, hidden navigation and autoplay', async () => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const orientation of ['horizontal', 'vertical']) {
      await open('Carousel', `orientation:${orientation};circular:!true`);
      await page.locator('.p-carousel-prev').click();
      await page.locator('.p-carousel-item-active:not(.p-carousel-item-cloned)').filter({ hasText: 'Blue Band' }).waitFor();
      await page.locator('.p-carousel-next').click();
      await page.locator('.p-carousel-item-active:not(.p-carousel-item-cloned)').filter({ hasText: 'Bamboo Watch' }).waitFor();
      await page.locator('.p-carousel-next').click();
      await page.locator('.p-carousel-item-active:not(.p-carousel-item-cloned)').filter({ hasText: 'Black Watch' }).waitFor();
      const box = await page.locator('.p-carousel').boundingBox();
      assert.ok(box && box.x >= 0 && box.x + box.width <= width);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    await page.goto(`${baseURL}/iframe.html?id=components-carousel-summary--summary&viewMode=docs`);
    const responsive = page.locator('.component-example .p-carousel').nth(1);
    await responsive.waitFor();
    await page.waitForFunction((expected) => document.querySelectorAll('.component-example .p-carousel')[1]?.querySelectorAll('.p-carousel-item-active').length === expected, width === 390 ? 1 : 3);
    if (width === 390) {
      await responsive.locator('.p-carousel-next').click();
      await responsive.locator('.p-carousel-item-active').filter({ hasText: 'Black Watch' }).waitFor();
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.waitForFunction(() => document.querySelectorAll('.component-example .p-carousel')[1]?.querySelectorAll('.p-carousel-item-active').length === 3);
    }
  }
  await open('Carousel', 'showNavigators:!false;showIndicators:!false;header:Products;footer:Collection');
  assert.equal(await page.locator('.p-carousel-next,.p-carousel-prev,.p-carousel-indicators').count(), 0);
  assert.equal(await page.locator('.p-carousel-header').textContent(), 'Products');
  assert.equal(await page.locator('.p-carousel-footer').textContent(), 'Collection');
  await open('Carousel', 'autoplayInterval:1000');
  await page.locator('.p-carousel-item-active:not(.p-carousel-item-cloned)').filter({ hasText: 'Black Watch' }).waitFor();
});


test('Carousel: count/page constraints and configuration changes', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (let visible = 1; visible <= 3; visible++) {
    for (let scroll = 1; scroll <= visible; scroll++) {
      await open('Carousel', `numVisible:${visible};numScroll:${scroll}`);
      assert.equal(await page.locator('.p-carousel-item-active').count(), visible);
      const lastPage = Math.ceil((3 - visible) / scroll);
      for (let index = 0; index < lastPage; index++) {
        await page.locator('.p-carousel-next').click();
        await page.waitForFunction((expected) => [...document.querySelectorAll('.p-carousel-indicator')].findIndex((item) => item.classList.contains('p-highlight')) === expected, index + 1);
      }
      if (lastPage) await page.locator('.p-carousel-item-active').filter({ hasText: 'Blue Band' }).waitFor();
      await page.locator('.p-carousel-next:disabled').waitFor();
      if (lastPage) {
        await open('Carousel', `numVisible:${visible};numScroll:${scroll};circular:!true`);
        await page.locator('.p-carousel-prev').click();
        await page.locator('.p-carousel-item-active:not(.p-carousel-item-cloned)').filter({ hasText: 'Blue Band' }).waitFor();
        await page.locator('.p-carousel-next').click();
        await page.locator('.p-carousel-item-active:not(.p-carousel-item-cloned)').filter({ hasText: 'Bamboo Watch' }).waitFor();
      }
    }
  }
  for (const args of ['numVisible:1;numScroll:2', 'numVisible:0', 'page:9', 'numVisible:3;page:1', 'circular:!true;page:1', 'autoplayInterval:-1']) {
    await open('Carousel', args);
    await page.getByRole('alert').waitFor();
    assert.equal(await page.locator('.p-carousel').count(), 0);
  }
  await page.goto(`${baseURL}/?path=/story/components-carousel--default`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.p-carousel').waitFor();
  await page.getByRole('tab', { name: 'Controls' }).click();
  await page.locator('#control-numVisible').fill('2');
  await page.locator('#control-numVisible').press('Tab');
  await preview.locator('.p-carousel-item-active').filter({ hasText: 'Black Watch' }).waitFor();
  await page.getByRole('button', { name: 'Reset controls' }).click();
  await preview.locator('.p-carousel-item-active').filter({ hasText: 'Bamboo Watch' }).waitFor();
  assert.equal(await preview.locator('.p-carousel-item-active').count(), 1);
});

test('Chart: six types render, Controls reset and Code remains copyable', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-chart-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Line', 'Bar', 'Pie', 'Doughnut', 'Polar area', 'Radar']);
  await page.waitForTimeout(1500);
  for (const canvas of await preview.locator('.component-example canvas').all()) {
    assert.ok(await canvas.evaluate(node => {
      const pixels = node.getContext('2d').getImageData(0, 0, node.width, node.height).data;
      let colored = 0;
      for (let i = 0; i < pixels.length; i += 4) if (pixels[i + 3] > 100 && pixels[i + 2] > pixels[i] + 30) colored++;
      return colored > 1000;
    }), 'Every Summary chart paints its data, not only axes and legend');
  }
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root canvas').waitFor();
  await page.getByRole('tab', { name: 'Controls' }).click();
  assert.equal(await page.getByRole('switch', { name: 'Edit data as JSON' }).count(), 1);
  assert.equal(await page.getByRole('switch', { name: 'Edit options as JSON' }).count(), 1);
  for (const type of ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar']) {
    await page.locator('#control-type').selectOption({ label: type });
    await page.waitForTimeout(600);
    const canvas = preview.locator('#storybook-root canvas');
    assert.equal(await canvas.count(), 1);
    assert.equal(await canvas.getAttribute('aria-label'), 'Sample values: A 12, B 19, C 3');
    assert.ok(await canvas.evaluate(node => node.getContext('2d').getImageData(0, 0, node.width, node.height).data.some((value, index) => index % 4 === 3 && value > 0)), `${type} paints pixels`);
  }
  await page.getByRole('switch', { name: 'Edit options as JSON' }).click();
  await page.locator('#control-options').fill(JSON.stringify({ animation: false, plugins: { title: { display: true, text: 'Edited chart' } } }));
  await page.locator('#control-options').press('Tab');
  await page.waitForFunction(() => document.querySelector('#storybook-preview-iframe')?.contentDocument?.querySelector('canvas')?.getAttribute('aria-label') === 'Edited chart');
  await page.getByRole('switch', { name: 'Edit data as JSON' }).click();
  await page.locator('#control-data').fill(JSON.stringify({ labels: ['Changed'], datasets: [{ label: 'Changed data', data: [8] }] }));
  await page.locator('#control-data').press('Tab');
  await page.waitForTimeout(500);
  assert.ok((await page.locator('#control-data').inputValue()).includes('Changed data'));
  await page.getByRole('button', { name: 'Reset controls', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#control-type')?.value === 'bar');
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  assert.ok((await page.getByRole('tabpanel', { name: 'Code', exact: true }).textContent()).includes('<Chart {...args} />'));
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const type of ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar']) {
      await open('Chart', `type:${type}`);
      await page.waitForTimeout(400);
      const bounds = await page.locator('canvas').boundingBox();
      assert.ok(bounds.width > 0 && bounds.x >= 0 && bounds.x + bounds.width <= width, `${type} fits ${width}px`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
  }
});

test('Checkbox: labeled states, icon spacing, keyboard and copyable code', async () => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await open('Checkbox');
    const input = page.getByRole('checkbox', { name: 'Chicago' });
    await page.getByText('Chicago', { exact: true }).click();
    await page.waitForFunction(() => document.querySelector('input')?.checked === false);
    assert.equal(await input.isChecked(), false);
    await input.press('Space');
    await page.waitForFunction(() => document.querySelector('input')?.checked === true);
    assert.equal(await input.isChecked(), true);
    for (const icon of ['!undefined', 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill']) {
      await open('Checkbox', `icon:${icon}`);
      const box = await page.locator('.p-checkbox').boundingBox();
      const label = await page.locator('label').boundingBox();
      assert.ok(label.x - box.x - box.width >= 7, 'Label has visible spacing');
      assert.ok(box.width > 0);
      if (icon !== '!undefined') assert.equal(await page.locator('.p-checkbox-icon.pi').count(), 1);
    }
    await open('Checkbox', 'readOnly:!true');
    await page.getByRole('checkbox').press('Space');
    assert.equal(await page.getByRole('checkbox').isChecked(), true);
    await open('Checkbox', 'disabled:!true');
    assert.equal(await page.getByRole('checkbox').isDisabled(), true);
    await open('Checkbox', 'invalid:!true;variant:filled;checked:!false');
    assert.equal(await page.locator('.p-checkbox.p-invalid.p-variant-filled').count(), 1);
    assert.equal(await page.getByRole('checkbox').getAttribute('aria-invalid'), 'true');
    await page.goto(`${baseURL}/iframe.html?id=components-checkbox-summary--summary&viewMode=docs`);
    await page.locator('.sbdocs-content h1').waitFor();
    const inputs = page.locator('.component-example input');
    assert.equal(await inputs.count(), 7);
    const ids = await inputs.evaluateAll(elements => elements.map(element => element.id));
    assert.equal(new Set(ids).size, 7);
    assert.equal(await page.locator('.docblock-source').count(), 7);
    assert.ok(await page.locator('body').evaluate(element => element.scrollWidth <= innerWidth));
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/story/components-checkbox--default`);
  await page.frameLocator('#storybook-preview-iframe').getByRole('checkbox').waitFor();
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  assert.ok((await page.locator('body').innerText()).includes('updateArgs({ checked: event.checked })'));
});

test('Chip: Controls restore removal, preserve image precedence and expose Code', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseURL}/?path=/docs/components-chip-summary--summary`);
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('.sbdocs-content h1').waitFor();
  assert.deepEqual(await preview.locator('.sbdocs-content h3').allTextContents(), ['Labels', 'Icons', 'Images', 'Removable']);
  await preview.getByRole('link', { name: 'Default', exact: true }).click();
  await preview.locator('#storybook-root .p-chip').waitFor();
  await page.getByRole('tab', { name: /Controls/ }).click();
  const toggle = async name => {
    const control = page.locator(`#control-${name}`);
    await control.focus();
    await control.press('Space');
  };
  await toggle('removable');
  await preview.locator('.p-chip-remove-icon').click();
  await preview.locator('.p-chip').waitFor({ state: 'hidden' });
  await page.waitForFunction(() => document.querySelector('#control-visible')?.checked === false);
  await toggle('visible');
  await preview.locator('.p-chip').waitFor();
  await preview.locator('.p-chip-remove-icon').press('Enter');
  await preview.locator('.p-chip').waitFor({ state: 'hidden' });
  await page.getByRole('button', { name: 'Reset controls' }).click();
  await preview.locator('.p-chip').waitFor();
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  assert.match(await page.getByRole('tabpanel', { name: 'Code', exact: true }).innerText(), /onRemove|chipProps/);
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const icon of ['check', 'search', 'bookmark', 'star-fill']) {
      await open('Chip', `icon:pi pi-${icon};removable:!true`);
      const bounds = await page.locator('.p-chip').evaluate(chip => {
        const icon = chip.querySelector('.p-chip-icon').getBoundingClientRect();
        const text = chip.querySelector('.p-chip-text').getBoundingClientRect();
        const remove = chip.querySelector('.p-chip-remove-icon').getBoundingClientRect();
        return { gap: text.left - icon.right, removeGap: remove.left - text.right };
      });
      assert.ok(bounds.gap > 0 && bounds.removeGap > 0, 'Icons do not overlap the label');
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${baseURL}/?path=/story/components-chip--default&args=icon:pi%20pi-search;removable:!true`);
    await page.getByRole('tab', { name: /Controls/ }).click();
    for (const avatar of ['amyelsner', 'onyamalimba']) {
      await page.locator('#control-image').selectOption({ label: `demo/images/avatar/${avatar}.png` });
      await preview.locator(`.p-chip img[src$="${avatar}.png"]`).waitFor();
      assert.equal(await preview.locator('.p-chip-icon').count(), 0, 'Native image precedence');
      assert.equal(await preview.locator('.p-chip').count(), 1);
    }
    await page.setViewportSize({ width, height: 900 });
    await preview.locator('.p-chip-remove-icon').press('Backspace');
    await preview.locator('.p-chip').waitFor({ state: 'hidden' });
  }
});
