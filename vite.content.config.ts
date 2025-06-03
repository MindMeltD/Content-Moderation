// vite.content.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist', // same as main build
    emptyOutDir: false, // prevent deleting popup assets
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        format: 'iife', // ✅ needed for content script
        inlineDynamicImports: true, // ✅ required with iife
      },
    },
  },
});
