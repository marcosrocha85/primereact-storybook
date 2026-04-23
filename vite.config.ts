import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'next/navigation', replacement: path.resolve(rootDir, 'src/next-stubs/navigation.ts') },
      { find: 'next/link', replacement: path.resolve(rootDir, 'src/next-stubs/link.tsx') },
      { find: 'next/head', replacement: path.resolve(rootDir, 'src/next-stubs/head.tsx') },
      { find: 'next', replacement: path.resolve(rootDir, 'src/next-stubs/next.ts') },
      { find: '@', replacement: path.resolve(rootDir, 'vendor/sakai-react') }
    ]
  },
  server: {
    port: 5173
  }
});
