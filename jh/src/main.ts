import type { Directive } from 'vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Toast } from 'vant'
import Vue3Lottie from 'vue3-lottie'
import App from './App.vue'
import router from '~/router'
import * as directives from '~/directives'

import 'uno.css' // 及其生态来实现css和icon图标的按需加载，不需要使用js就能引入图标
import 'vant/lib/toast/index.css'
import '@unocss/reset/tailwind.css'

import './styles/main.scss'
import 'vue3-lottie/dist/style.css'

import 'lib-flexible/flexible' // 为html、body添加font-size，窗口调整时候重新设置font-size

Toast.setDefaultOptions({ duration: 3000 })

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$toast = Toast
app.use(Vue3Lottie)

Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(router)
app.use(pinia)
app.mount('#app')
