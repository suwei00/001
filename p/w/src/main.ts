import { createApp, Directive } from 'vue';
import { ElLoading } from 'element-plus';
import { store, key } from './store';
import storePinia from './store-pinia';
import router from '@/router';
import { setGlobalOptions } from 'vue-request';
import * as directives from '@/directives';
import App from '@template-components/App.vue';
import '@site/element-variables.scss';
import { createI18n } from 'vue-i18n';
import viLocale from 'element-plus/lib/locale/lang/vi';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import AppImage from '@/components/app-image/index.vue';
import * as ElementPlusIcon from '@element-plus/icons';

const app = createApp(App);

const messages = require(`@/language/${globalConfig.LANG}.js`);
const locale = globalConfig.LANG === 'vi' ? viLocale : zhLocale;
setGlobalOptions({});
const i18n: any = createI18n({
  legacy: false,
  locale: globalConfig.LANG,
  fallbackLocale: globalConfig.LANG,
  messages: {
    [globalConfig.LANG]: {
      // el 这个属性很关键，一定要保证有这个属性，
      el: locale.el,
      // 不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
      ...messages
    }
  }
});

for (const name in ElementPlusIcon) {
  app.component(name, (ElementPlusIcon as any)[name]);
}

// 禁用下一行ts
// @ts-ignore
// ElementLocale.i18n(i18n.global.t);

app.component('AppImage', AppImage);

// store
if (globalConfig.STORE === 'vuex') {
  app.use(store, key);
} else {
  app.use(storePinia);
}

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.config.globalProperties.$loading = ElLoading.service;
app.config.globalProperties.site = globalConfig.SITE;
app.config.globalProperties.siteName = globalConfig.SITE_NAME;
app.config.globalProperties.$$t = i18n.global.t;
app
  .use(router)
  .use(ElLoading)
  .use(i18n)
  .mount('#App');

if ((module as any).hot) {
  (module as any).hot.accept();
}
