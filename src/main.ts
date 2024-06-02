import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  blueprint: md1,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  },
  text: '#252525',
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
