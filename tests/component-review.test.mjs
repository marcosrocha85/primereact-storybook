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

test('Toast and Messages show and clear feedback', async () => {
  for (const name of ['Toast', 'Messages']) {
    await open(name);
    await page.getByRole('button', { name: `Show ${name.toLowerCase()}`, exact: true }).click();
    await page.getByText('Action completed', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Clear', exact: true }).click();
    await page.getByText('Action completed', { exact: true }).waitFor({ state: 'hidden' });
  }
});

test('popup menus and context menu have working triggers', async () => {
  for (const name of ['Menu', 'TieredMenu']) {
    await open(name, 'popup:!true');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('.p-menu-overlay, .p-tieredmenu-overlay').waitFor();
    await page.keyboard.press('Escape');
    await page.locator('.p-menu-overlay, .p-tieredmenu-overlay').waitFor({ state: 'hidden' });
  }
  await open('ContextMenu');
  await page.getByText('Right click or press Shift+F10 here').click({ button: 'right' });
  await page.getByRole('menubar').waitFor();
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

test('Calendar selects and clears a date; InputNumber supports currency', async () => {
  await open('Calendar');
  await page.locator('.p-datepicker-trigger').click();
  await page.locator('.p-datepicker-calendar td:not(.p-datepicker-other-month) > span:not(.p-disabled)').filter({ hasText: /^15$/ }).click();
  await page.waitForFunction(() => Boolean(document.querySelector('input')?.value));
  await page.locator('.p-datepicker-trigger').click();
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('input')?.value === '');
  await open('InputNumber', 'mode:currency');
  await page.getByRole('spinbutton').fill('125');
  await page.getByRole('spinbutton').press('Tab');
  assert.match(await page.getByRole('spinbutton').inputValue(), /125/);
});

test('Chips adds/removes tokens and InputMask retains formatted input', async () => {
  await open('Chips');
  await page.locator('input').fill('First');
  await page.locator('input').press('Enter');
  await page.locator('.p-chips-token').filter({ hasText: 'First' }).waitFor();
  await page.locator('.p-chips-token-icon').click();
  await page.locator('.p-chips-token').waitFor({ state: 'hidden' });
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
