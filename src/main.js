import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zh_cn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
    locale: zh_cn
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
