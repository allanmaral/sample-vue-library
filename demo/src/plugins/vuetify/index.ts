import {Vue2} from 'vue-demi';
import Vuetify from 'vuetify/lib/framework';

if (Vue2) {
  const Vue = Vue2 as any;
  Vue.use(Vuetify);
}

export default new Vuetify({
  theme: { dark: true },
});