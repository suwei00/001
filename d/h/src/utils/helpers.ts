/**
 * 获取浏览器类型
 * @returns
 */
import Session from './session';
import router from '@/router';
import { launchVanue } from '@/mixins/gameVenue';

export const BrowserType = (): string => {
  const userAgent = window.navigator.userAgent;

  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    return 'Safari';
  }

  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge';
  }

  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  }

  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }

  if (userAgent.indexOf('.NET') > -1) {
    return 'IE';
  }

  return '';
};

/**
 * 判断是否支持webp图片格式
 */
export const checkWebp = () => {
  // return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') > -1;
  return (
    document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0
  );
  // return isSupportedWebp;
};

// 是否支持webp图片格式标识
export const isWebp: boolean = checkWebp();

/**
 *  get请求表单序列化
 */
export function param(data: any) {
  let url = '';
  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      const value = data[k] !== undefined ? data[k] : '';
      url += '&' + k + '=' + encodeURIComponent(value);
    }
  }

  return url ? url.substring(1) : '';
}

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url: string) => {
  const arr: any[] = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  return arr.reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );
};

export function getCookiesKey() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);

  return keys || [];
}
// 获取操作系统
export const getOSInfo = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Windows NT 10.0') !== -1)
    return { os: 'Windows', os_version: 'Windows 10' };
  if (userAgent.indexOf('Windows NT 6.2') !== -1) return { os: 'Windows', os_version: 'Windows 8' };
  if (userAgent.indexOf('Windows NT 6.1') !== -1) return { os: 'Windows', os_version: 'Windows 7' };
  if (userAgent.indexOf('Windows NT 6.0') !== -1)
    return { os: 'Windows', os_version: 'Windows Vista' };
  if (userAgent.indexOf('Windows NT 5.1') !== -1)
    return { os: 'Windows', os_version: 'Windows XP' };
  if (userAgent.indexOf('Windows NT 5.0') !== -1)
    return { os: 'Windows', os_version: 'Windows 2000' };
  if (userAgent.indexOf('iPhone') !== -1)
    return { os: 'IPhone', os_version: userAgent.match(/CPU iPhone OS (.*?) like Mac OS X/)?.[1] };
  if (userAgent.indexOf('Mac') !== -1 || userAgent.indexOf('IPad') !== -1)
    return { os: 'MacOS', os_version: userAgent.match(/Mac OS X (.*?)\)/)?.[1] };
  if (userAgent.indexOf('Android') !== -1)
    return { os: 'Android', os_version: userAgent.match(/Android (.*?);/)?.[1] };
  return { os: 'Other', os_version: 'Other' };
};

export function getBrowser() {
  const UserAgent: any = navigator.userAgent.toLowerCase();
  const browserInfo: any = {};
  const browserArray: any = {
    IE: 'ActiveXObject' in window, // IE
    Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
    Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
    Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
    Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') === -1, // safari浏览器
    Edge: UserAgent.lastIndexOf('edg') > -1, // Edge浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent) // 微信浏览器
  };
  let versions = '';
  for (const i in browserArray) {
    if (browserArray[i]) {
      if (i === 'IE') {
        const match = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/);
        versions = match ? match[2] : '9.2';
        browserInfo.type = 'IE';
      } else if (i === 'Chrome') {
        const match = UserAgent.match(/chrome\/([\d.]+)/);
        browserInfo.type = 'Chrome';
        versions = match ? match[1] : '88.2.2';
      } else if (i === 'Firefox') {
        const match = UserAgent.match(/firefox\/([\d.]+)/);
        browserInfo.type = 'Firefox';
        versions = match ? match[1] : '99.2.3';
      } else if (i === 'Opera') {
        const match = UserAgent.match(/opera\/([\d.]+)/);
        browserInfo.type = 'Opera';
        versions = match ? match[1] : '89.43.3';
      } else if (i === 'Safari') {
        const match = UserAgent.match(/version\/([\d.]+).*/);
        browserInfo.type = 'Safari';
        versions = match ? match[1] : '7.3.4';
      } else if (i === 'Edge') {
        const match = UserAgent.match(/edg\/([\d.]+)/);
        browserInfo.type = 'Edge';
        versions = match ? match[1] : '32.34';
      }
    }
  }

  browserInfo.browser_version = Number(versions.split('.')[0]);
  browserInfo.mobile = !!UserAgent.match(/applewebkit.*mobile.*/) ? 'mobile' : 'pc'; // 是否为移动终端
  browserInfo.isIos =
    !!UserAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || UserAgent.indexOf('intel mac os') > -1;

  return browserInfo;
}
/**
 * @description 判断用户是否登录
 * @return {*}
 */
export function isLogin() {
  return !!Session.get('login');
}

export const SuffixInteger = (num: string | number, length: number) => {
  return `${num}0000000000000000`.slice(0, length);
};

export const goToServeUrl = () => {
  router.push('/customer-service');
};

export const onBannerJump = (item: any) => {
  const { flags, url } = item;
  if (flags === '5' || url === '/') return;
  if (flags === '1') {
    router.push(url);
  } else if (flags === '2') {
    window.open(url);
  } else if (flags === '3') {
    launchVanue({ id: url });
  }
};
