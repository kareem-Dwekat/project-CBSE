import { createApp, h } from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router/index.js'
import { createAppVuetify } from './plugins/vuetify.js'

const vueLifecycles = singleSpaVue({
  createApp,

  appOptions: {
    el: '#account-mfe',

    render() {
      return h(App)
    },
  },

  handleInstance(app) {
    app.use(router)
    app.use(createAppVuetify())
  },
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount