import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'src/assets', // source directory
    //       dest: './'              // destination in /dist/assets
    //     }
    //   ]
    // })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, 'src/background.js'),
        // content: path.resolve(__dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'es',
      },
    }
  },

})
