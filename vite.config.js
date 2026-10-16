import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

// Relative base so the build works both as a project page
// (yashtajne.github.io/Portfolio/) and as a user page (yashtajne.github.io/).
export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  plugins: [svelte()]
})
