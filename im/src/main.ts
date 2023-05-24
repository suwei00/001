import { createApp } from 'vue'
import '@/assets/scss/index.scss'
import "./styles/global.scss";
import './style.css'
import 'amfe-flexible'
import App from './App.vue'
import store from './store'
import router from './router'
import LongPress from '@/directive/long-press'
import i18n from './i18n'
import Plugins from "@/utils/plugins"
import { Lazyload } from 'vant'

const app = createApp(App)
app.use(store).use(router).use(LongPress).use(i18n).use(Lazyload).use(Plugins).mount('#app')
