import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import http from './http'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$http = http;

app.mount('#app')
