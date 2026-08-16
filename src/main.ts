import { createApp } from 'vue'

import App from './app.vue'
import router from './router/index.js'
import { createAppVuetify } from './plugins/vuetify.js'

const app = createApp(App)
const vuetify = createAppVuetify()

app.use(router)
app.use(vuetify)
app.mount('#app')