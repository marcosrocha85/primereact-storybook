import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Sakai Storybook',
    brandUrl: 'https://github.com/primefaces/sakai-react',
    colorPrimary: '#0f766e',
    colorSecondary: '#2563eb',
    appBg: '#f6f8fb',
    appContentBg: '#ffffff',
    appPreviewBg: '#f6f8fb',
    barBg: '#ffffff',
    barSelectedColor: '#0f766e',
    inputBg: '#ffffff',
    inputBorder: '#d9e2ec'
  })
});
