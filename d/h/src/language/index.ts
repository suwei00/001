import { createI18n } from 'vue-i18n';
import { getUrlParameters } from '@/utils/common';

const { l } = getUrlParameters(window.location.href);

const LANG = (l === 'vi' || l === 'zh-CN') ? l : globalConfig.LANG;
const _LANG = LANG === 'zh-CN' ? 'zh' : LANG;

const i18n = createI18n({
  legacy: false,
  locale: _LANG,
  messages: {
    [_LANG]: require(`./${_LANG}.js`)
  }
});

export default i18n;