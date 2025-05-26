import { defineConfig, resolveConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        rollupOptions: {
            input: {
                popup: 'src/popup.html'
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: 'assets/[name].[ext]',
                chunkFileNames: 'chunks/[name].js'
            }
        }
    }
})
