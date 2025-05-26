import { defineConfig, resolveConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
    // base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        rollupOptions: {
            input: {
                popup: path.resolve(__dirname, 'popup.html')
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: 'assets/[name].[ext]',
                chunkFileNames: 'chunks/[name].js'
            }
        }
    }
})
