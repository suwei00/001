import dayjs from 'dayjs';
import Session from './session';
import { getCustomerServeUrl } from '@/utils/common';
import router from '@/router';
import { launchVanue } from './gameVenue';

const defaultTime: string[] = ['00:00:00', '23:59:59'];
export const FormatPickerDateTime = (dateTime: string[]) => {
  let datePre = '';
  let dateNext = '';
  if (dateTime && dateTime.length > 0) {
    datePre = datePrefixEnd(dateTime[0], defaultTime[0]);
    dateNext = datePrefixEnd(dateTime[1], defaultTime[1]);
    return [datePre, dateNext];
  }
  return [];
};
const datePrefixEnd = (dateTime: any, value: string) => {
  return dayjs(dateTime).format('YYYY-MM-DD') + ' ' + value;
};

export const FormatCloserDays = (day: any) => {
  const localDayTime = dayjs().format('YYYY-MM-DD') + ' ' + defaultTime[1];
  const dayValues =
    dayjs()
      .subtract(day - 1, 'day')
      .format('YYYY-MM-DD') +
    ' ' +
    defaultTime[0];
  // 本月
  if (day === 0) {
    let date = new Date();
    // 获取当前月的第一天
    let monthStart = dayjs().subtract(1, 'month');
    let firstMonthDay = datePrefixEnd(monthStart, defaultTime[0]);
    console.log(firstMonthDay, localDayTime);
    return [firstMonthDay, localDayTime];
  }
  // 昨天
  if (day === 2) {
    return [
      dayValues,
      dayjs()
        .subtract(day - 1, 'day')
        .format('YYYY-MM-DD') +
        ' ' +
        defaultTime[1]
    ];
  }
  return [dayValues, datePrefixEnd(undefined, defaultTime[1])];
};

export const getDistanceSpecifiedTime = (dateTime: number) => {
  // 指定日期和时间
  let StartTime = new Date(dateTime);
  // 当前系统时间
  let NowTime = new Date();
  let t = NowTime.getTime() - StartTime.getTime() * 1000;
  let d = Math.floor(t / 1000 / 60 / 60 / 24);
  return d === 0 ? 1 : d;
};
/**
 * 获取浏览器类型
 * @returns
 */
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
export const checkWebp = (): boolean => {
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch (err) {
    return false;
  }
};

// 判断是否支持 avif 格式
export const checkAvif = () => {
  return new Promise(resolve => {
    const img = new Image();
    img.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    img.onload = () => {
      resolve(true);
    };
  });
};

// 是否支持webp图片格式标识
export const isWebp: boolean = checkWebp();

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url: string) => {
  const arr: any[] = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  return arr.reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
};

/**
 * @description 获取浏览器信息
 * @export
 * @return {*}
 */
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
  for (let i in browserArray) {
    if (browserArray[i]) {
      let versions = '';
      if (i === 'IE') {
        versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
      } else if (i === 'Chrome') {
        for (const mt in navigator.mimeTypes) {
          // 检测是否是360浏览器(测试只有pc端的360才起作用)
          if (navigator.mimeTypes[mt].type === 'application/360softmgrplugin') {
            i = '360';
          }
        }
        versions = UserAgent.match(/chrome\/([\d.]+)/)[1];
      } else if (i === 'Firefox') {
        versions = UserAgent.match(/firefox\/([\d.]+)/)[1];
      } else if (i === 'Opera') {
        versions = UserAgent.match(/opera\/([\d.]+)/)[1];
      } else if (i === 'Safari') {
        versions = UserAgent.match(/version\/([\d.]+).*/)[1];
      } else if (i === 'Edge') {
        console.log('i=====>', i);
        versions = UserAgent.match(/edg\/([\d.]+)/)[1];
      } else if (i === 'QQBrowser') {
        versions = UserAgent.match(/qqbrowser\/([\d.]+)/)[1];
      }
      browserInfo.type = i;
      browserInfo.browser_version = Number(versions?.split('.')[0]);
      browserInfo.mobile = !!UserAgent.match(/applewebkit.*mobile.*/) ? 'mobile' : 'pc'; // 是否为移动终端
      browserInfo.isIos = !!UserAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || UserAgent.indexOf('intel mac os') > -1;
    }
  }
  return browserInfo;
}
// 获取操作系统
export const getOSInfo = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Windows NT 10.0') !== -1) return { os: 'Windows', os_version: 'Windows 10' };
  if (userAgent.indexOf('Windows NT 6.2') !== -1) return { os: 'Windows', os_version: 'Windows 8' };
  if (userAgent.indexOf('Windows NT 6.1') !== -1) return { os: 'Windows', os_version: 'Windows 7' };
  if (userAgent.indexOf('Windows NT 6.0') !== -1) return { os: 'Windows', os_version: 'Windows Vista' };
  if (userAgent.indexOf('Windows NT 5.1') !== -1) return { os: 'Windows', os_version: 'Windows XP' };
  if (userAgent.indexOf('Windows NT 5.0') !== -1) return { os: 'Windows', os_version: 'Windows 2000' };
  if (userAgent.indexOf('iPhone') !== -1) return { os: 'IPhone', os_version: userAgent.match(/CPU iPhone OS (.*?) like Mac OS X/)?.[1] };
  if (userAgent.indexOf('Mac') !== -1 || userAgent.indexOf('IPad') !== -1) return { os: 'MacOS', os_version: userAgent.match(/Mac OS X (.*?)\)/)?.[1] };
  if (userAgent.indexOf('Android') !== -1) return { os: 'Android', os_version: userAgent.match(/Android (.*?);/)?.[1] };
  return { os: 'Other', os_version: 'Other' };
};

/**
 * @description 判断用户是否登录
 * @return {*}
 */
export function isLogin() {
  return !!Session.get('login');
}

export const PrefixInteger = (num: string | number, length: number) => {
  return `0000000000000000${num}`.substr(-length);
};

export const SuffixInteger = (num: string | number, length: number) => {
  return `${num}0000000000000000`.slice(0, length);
};

export const desensitization = (name: string) => {
  const surplus = name.slice(3);
  let tail = '';
  for (let i = 0; i < surplus.length; i++) {
    tail = tail + '*';
  }
  return name.slice(0, 3) + tail;
};

export const goToServeUrl = () => {
  window.open(getCustomerServeUrl());
};

export const onBannerJump = (item: any) => {
  console.error('item', item);
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
