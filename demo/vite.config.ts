import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import ViteComponents, { VuetifyResolver } from 'vite-plugin-components'

function vuetifyScssPlugin() {
  return {
    name: "vuetify-scss-plugin",
    load(id) {
      if (/\/V[A-Z]\w+.sass$/.test(id)) {
        return '@import "@/styles/vuetify/variables"\n' + fs.readFileSync(id);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },
  plugins: [
    createVuePlugin(),
    vuetifyScssPlugin(),
    ViteComponents({
      customComponentResolvers:[
        VuetifyResolver()
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  server: {
    port: 8080
  }
})
