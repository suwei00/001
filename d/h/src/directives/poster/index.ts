import { Directive } from 'vue';
import { isWebp } from '@/utils/helpers';
import { urlToOrigin } from '@/utils/common';
let srcPath: string = '';
if (globalConfig.IS_PROD) {
  srcPath = urlToOrigin(globalConfig.APP_CDN_URL);
}
const poster: Directive = {
  beforeMount(el: Element) {
    const poster_url: string | null = el.getAttribute('poster');
    if (isWebp && poster_url) {
      el.setAttribute('poster', `${srcPath}${globalConfig.STATIC_RESOURCE}/${globalConfig.THEME}/${globalConfig.SITE}${poster_url}.webp?v=${globalConfig.VERSION}`);
    }
    if (!isWebp && poster_url) {
      el.setAttribute('poster', `${srcPath}${globalConfig.STATIC_RESOURCE}/${globalConfig.THEME}/${globalConfig.SITE}${poster_url}?v=${globalConfig.VERSION}`);
    }
  }
};
export default poster