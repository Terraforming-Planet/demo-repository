import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Graphic-gen-Terrain-Formation-Planet-Photovoltaic-Vehicles/',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
