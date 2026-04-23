import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  staticDirs: ['../public', { from: '../vendor/sakai-react/public', to: '/' }],
  docs: {
    defaultName: 'Documentacao'
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    const existingAliases = Array.isArray(config.resolve.alias) ? config.resolve.alias : [];
    config.resolve.alias = [
      { find: 'next/navigation', replacement: path.resolve(storybookDir, '../src/next-stubs/navigation.ts') },
      { find: 'next/link', replacement: path.resolve(storybookDir, '../src/next-stubs/link.tsx') },
      { find: 'next/head', replacement: path.resolve(storybookDir, '../src/next-stubs/head.tsx') },
      { find: 'next', replacement: path.resolve(storybookDir, '../src/next-stubs/next.ts') },
      { find: '@', replacement: path.resolve(storybookDir, '../vendor/sakai-react') },
      ...existingAliases
    ];

    return config;
  }
};

export default config;
