import type { Preview } from '@storybook/react-vite';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '../vendor/sakai-react/layout/context/layoutcontext';
import { themes } from 'storybook/theming';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../vendor/sakai-react/styles/layout/layout.scss';
import '../vendor/sakai-react/styles/demo/Demos.scss';
import '../vendor/sakai-react/styles/demo/flags/flags.css';
import '../vendor/sakai-react/styles/demo/BlockViewer.scss';
import '../vendor/sakai-react/styles/demo/TimelineDemo.scss';
import '../src/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <PrimeReactProvider>
        <LayoutProvider>
          <div className="sakai-storybook-frame">
            <Story />
          </div>
        </LayoutProvider>
      </PrimeReactProvider>
    )
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      theme: themes.light,
      canvas: {
        sourceState: 'hidden',
        withToolbar: true
      },
      source: {
        language: 'tsx',
        type: 'code',
        dark: true
      }
    },
    options: {
      storySort: {
        order: [
          'Introducao',
          'Fundamentos',
          'Components',
          'Sakai React',
          ['Button', 'Input', 'Data', 'Panel', 'Overlay, Menu e Message', 'Media, Charts, File e Misc']
        ]
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
