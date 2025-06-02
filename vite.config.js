import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base:  mode === 'production' ? '/temps-cuisson-air-fryer/' : '/', // ← clé du problème
  plugins: [vue()],
}))
