import type { Directive } from 'vue'
import { createApp } from 'vue'

import Vue3Lottie from 'vue3-lottie'
import App from './App.vue'
import router from '~/router'
import * as directives from '~/directives'
import '@unocss/reset/tailwind.css'
import './styles/main.scss'

import 'animate.css'
import 'uno.css'

const app = createApp(App)

Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(pinia)
  .use(router)
  .use(Vue3Lottie)
  .mount('#app')
