import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), checker({ typescript: true }), wasm(), topLevelAwait()],
  build: {
    commonjsOptions: { include: [] },
  },
  optimizeDeps: {
    disabled: false,
  },
  base: command === 'serve' ? undefined : '/world-generator/'
}))
