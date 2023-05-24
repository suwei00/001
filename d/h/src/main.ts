import { createApp, defineAsyncComponent, Directive } from 'vue';
import { store, key } from './store';
import storePinia from './store-pinia';
import * as directives from '@/directives';
import { createI18n } from 'vue-i18n';
import {
  Toast,
  Icon,
  NavBar,
  List,
  Popup,
  Picker,
  PullRefresh,
  DatetimePicker,
  Overlay,
  Tab,
  Tabs,
  Col,
  Row,
  Field,
  NoticeBar,
  Swipe,
  SwipeItem,
  Checkbox,
  Button,
  ActionSheet,
  Circle,
  Collapse,
  CollapseItem
} from 'vant';
import 'vant/lib/index.css';

import VueI18n from '@/language/index';
import router from './router';
import AppImage from '@/components/app-image/index.vue';
const messages = require(`@/language/${globalConfig.LANG}.js`);

const App = defineAsyncComponent(() => import(`@/components/${globalConfig.TEMPLATE}/App.vue`));

const i18n: any = createI18n({
  legacy: false,
  locale: globalConfig.LANG,
  fallbackLocale: globalConfig.LANG,
  messages: {
    [globalConfig.LANG]: {
      ...messages
    }
  }
});

Toast.setDefaultOptions({ duration: 2000, className: 'cg-toast' });

const app = createApp(App);
app.config.globalProperties.site = globalConfig.SITE;
app.config.globalProperties.siteName = globalConfig.SITE_NAME;
app.config.globalProperties.$$t = i18n.global.t;

// 注册自定义指令
// tslint:disable-next-line: no-shadowed-variable
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});
app.component('AppImage', AppImage);

if (globalConfig.STORE === 'vuex') {
  app.use(store, key);
} else {
  app.use(storePinia);
}

app
  .use(router)
  .use(Icon)
  .use(NavBar)
  .use(List)
  .use(Popup)
  .use(Picker)
  .use(PullRefresh)
  .use(DatetimePicker)
  .use(Overlay)
  .use(Tab)
  .use(Tabs)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(NoticeBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Checkbox)
  .use(Button)
  .use(ActionSheet)
  .use(Circle)
  .use(Collapse)
  .use(CollapseItem)
  .use(VueI18n)
  .mount('#App');

if ((module as any).hot) {
  (module as any).hot.accept();
}

// 禁止缩放
document.addEventListener('gesturestart', event => {
  event.preventDefault();
});
