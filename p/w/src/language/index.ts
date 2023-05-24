// const createV18 = () => {
//   const { getCommandParams } = require('../../build/common');
//   let { LANG = 'zh' } = getCommandParams();
//   // LANG = 'zh';
//   const code = `
//     // import { createI18n } from 'vue-i18n';
//     sessionStorage.setItem('lang', '${LANG}');
//     // const i18n = createI18n({
//     //   locale: '${LANG}',
//     //   messages: {
//     //     ${LANG}: require('./${LANG}.js')
//     //   }
//     // });
//     // export default i18n;
//     const message = require('./${LANG}.js');
//     export default message;
//   `;
//   return {
//     code
//   };
// };
//
// module.exports = createV18;

import { createI18n } from 'vue-i18n';
import { getUrlParameters } from '@/utils/common';

const { l } = getUrlParameters(window.location.href);

const LANG = (l === 'vi' || l === 'zh-CN') ? l : globalConfig.LANG;
const i18n = createI18n({
  locale: LANG,
  messages: {
    [LANG]: require(`./${LANG}.js`)
  }
});

export default i18n;

