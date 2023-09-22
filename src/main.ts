import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// import './assets/css/main.css'
import './assets/css/tailwind.css' // Import taild css file

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
