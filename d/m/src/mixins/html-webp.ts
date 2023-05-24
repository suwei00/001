import { escape2Html } from '@/utils/common';
import { isWebp } from '@/utils/helpers';

const htmlWebp = (html: string, id: string) => {
  const parent = document.getElementById(id);
  const el = document.createElement('div');
  el.innerHTML = escape2Html(html);
  const imgList = el.getElementsByTagName('img');
  if (imgList.length) {
    Array.from(imgList).forEach(img => {
      // 生成dom后 相对路径src会自动加上当前域名，替换掉后再判断
      const src = img.src.replace(window.location.origin, '');
      if (/^\/images\//g.test(src) && !/^http|https:/g.test(src)) {
        img.src = isWebp ? `${globalConfig.APP_CDN_URL}${src}.webp` : `${globalConfig.APP_CDN_URL}${src}`;
      }
    });
  }
  if (parent) {
    parent.innerHTML = '';
    parent.appendChild(el);
  }
};

export default htmlWebp;
