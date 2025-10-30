
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import installPrimeVue from './plugins/primevue'

import App from './App.vue'
import router from './router'

import 'animate.css'
import "./style.css"

const app = createApp(App)

app.use(createPinia())
installPrimeVue(app)
app.use(router)

app.mount('#app')
