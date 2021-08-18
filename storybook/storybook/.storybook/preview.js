// Imports for configuring Vuetify
import Vue from 'vue'
import Vuetify from 'vuetify'

// configure Vue to use Vuetify
Vue.use(Vuetify)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

// instantiate Vuetify instance with any component/story level params
const vuetify = new Vuetify({
  icons: {
    iconfont: "fa",
  },
})

export const decorators = [
  (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context)
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      vuetify,
      components: { wrapped },
      props: {
        dark: {
          type: Boolean,
          default: context.args.dark,
        },
        locale: {
          type: String,
          default: 'en',
        },
      },
      watch: {
        dark: {
          immediate: true,
          handler (val) {
            this.$vuetify.theme.dark = val
          }
        }
      },
      template: `
        <v-app>
          <v-container fluid>
            <wrapped />
          </v-container>
        </v-app>
      `
    })
  },
]