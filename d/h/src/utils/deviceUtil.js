import murmurHash3 from 'murmurhash3js';
export function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '18pt Arial';
  context.textBaseline = 'top';
  context.fillText('Hello, user.', 2, 2);
  const url = canvas.toDataURL('img/jpeg');
  return murmurHash3.x86.hash128(url, 24);
}

export const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));

/**
 * 判断 浏览器类型
 *     手机端或PC端
 *     操作系统
 * */

const browser = {
  versions: (function () {
    const u = navigator.userAgent;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('Intel Mac OS') > -1, //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      safari: u.indexOf('Safari') !== -1,
      QQBrowser: u.indexOf('qqbrowser') !== -1 // qq浏览器
    };
  })(),
  language: navigator.language.toLowerCase()
};

export function getIosVersion() {
  const str = navigator.userAgent.toLowerCase();
  const ver = str.match(/cpu iphone os (.*?) like mac os/);
  return Array.isArray(ver) ? ver[1].replace(/_/g, '.') : '1';
}

//获取 系统默认字体
export function getFontFamily() {
  const html = document.documentElement;
  const computedStyles = window.getComputedStyle(html);
  return computedStyles['font-family'];
}

// 判断系统字体
export function isSupportFontFamily(f = '') {
  if (typeof f != 'string') {
    return false;
  }
  const h = getFontFamily();
  if (f.toLowerCase() === h.toLowerCase()) {
    return true;
  }
  let e = 'a';
  let d = 100;
  let a = 100,
    i = 100;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = a;
  canvas.height = i;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'middle';
  function g(j) {
    ctx.clearRect(0, 0, a, i);
    ctx.font = d + 'px ' + j + ', ' + h;
    ctx.fillText(e, a / 2, i / 2);
    const k = ctx.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function (l) {
      return l !== 0;
    });
  }
  return g(h).join('') !== g(f).join('');
}

export function checkSystemFonts() {
  const fontFamily = [
    'Arial',
    'Microsoft YaHei',
    'sans-serif',
    'Tahoma',
    'Helvetica',
    '\\5b8b\\4f53',
    'Hiragino Sans GB',
    'Verdana',
    'Heiti SC',
    'Hiragino KakuGothic',
    'Times New Roman',
    'Helvetica Neue',
    'PingFang SC',
    'San Francisco',
    'Droid Sans',
    'Droid Sans',
    'Droid Sans Fallback',
    'STXihei',
    'WenQuanYi Micro Hei'
  ];

  return fontFamily.filter(font => isSupportFontFamily(font)).join('，');
}

export function getTimeZone() {
  return 'UTC+' + (0 - new Date().getTimezoneOffset() / 60);
}

export function getAudioCtx() {
  // for legacy browsers
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioContext = new AudioContext();

  console.log('audioContext===>', audioContext);
}