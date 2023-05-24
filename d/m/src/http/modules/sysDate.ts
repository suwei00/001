import { getServiceUrl, getLangPath } from '@/utils/common';
/**
 * 获取服务器时间
 */
export function getServerTime() {
  alert(1)
  const url: string = getServiceUrl('date') + `?r=${performance.now()}`;
  return new Promise(resolve => {
    const xhr: any = new XMLHttpRequest();
    xhr.open('head', url, true);
    xhr.send(null);
    xhr.timeout = 15000;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const serverDateStr = xhr.getResponseHeader('Date');

        // 1，相对于服务器的本地时间
        const serverDate: Date = new Date(serverDateStr);
        const now = new Date().getTime();
        const offsetTime = serverDate.getTime() - now;
        const localTime = new Date(new Date().getTime() + offsetTime);
        // console.log('服务器时间', serverDateStr)
        // console.log('偏移时间', offsetTime, 'ms')
        // console.log('发送时间', localTime.toUTCString())
        // console.log('====================')
        resolve(localTime.toUTCString());
      }
    };
  });
}

/**
 * 获取服务错误json
 */
export function getErrorJson() {
  const url: string = getLangPath() + `?r=${performance.now()}`;
  return new Promise(resolve => {
    const xhr: any = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.send(null);
    xhr.timeout = 15000;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const jsonStr = xhr.responseText;
        resolve(JSON.parse(jsonStr));
      }
    };
  });
}
