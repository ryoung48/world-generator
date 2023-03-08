import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), checker({ typescript: true })],
  base: command === 'serve' ? undefined : '/world-generator/'
}))
