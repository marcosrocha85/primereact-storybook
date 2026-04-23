import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      theme: themes.light
    },
    options: {
      storySort: {
        order: ['Introducao', 'Fundamentos', 'Layout', 'Componentes']
      }
    },
    backgrounds: {
      default: 'sakai',
      values: [
        { name: 'sakai', value: '#f6f8fb' },
        { name: 'surface', value: '#ffffff' },
        { name: 'graphite', value: '#111827' }
      ]
    }
  }
};

export default preview;
