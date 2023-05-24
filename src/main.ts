import { createApp } from 'vue'
import type { Directive } from 'vue'
import 'amfe-flexible'
// import VConsole from 'vconsole'
import App from './App.vue'
import store from './store'
import * as directives from './directives'
import router from '@/router'
import 'vant/es/dialog/style'
import 'uno.css'
import './style.css'
import 'vant/es/toast/style'

// 适配监听桌面版mouse事件
import '@vant/touch-emulator'

const app = createApp(App)

Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount('#app')

// new VConsole()
