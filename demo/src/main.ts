import App from './App.vue'
import { createApp, h, Vue2, install } from 'vue-demi'
import vuetify from './plugins/vuetify';

if (Vue2) {
  const Vue = Vue2 as any
  Vue.config.productionTip = false;
  Vue.config.devtools = true;
}

install()

const app = createApp({
  vuetify,
  render: () => h(App)
})

app.mount('#app')
