function padStart(s: string = '', l: number, w: string) {
  while (s.length < l) {
    s = w + s;
  }
  if (s.length > l) s = s.slice(s.length - l);
  return s;
}

/**
 * 日期格式化
 * date {Date|Number} 日期
 * fmt {String} 格式
 */
export function dateFormat(date: Date, fmt: string = 'yyyy-MM-dd'): string {
  if (!date) date = new Date();
  if (typeof date === 'number') date = new Date(date);
  return fmt
    .replace('yyyy', String(date.getFullYear()))
    .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
    .replace('dd', String(date.getDate()).padStart(2, '0'))
    .replace('hh', String(date.getHours()).padStart(2, '0'))
    .replace('mm', String(date.getMinutes()).padStart(2, '0'))
    .replace('ss', String(date.getSeconds()).padStart(2, '0'))
    .replace('SS', String(date.getMilliseconds()));
}

export function dateTimeFormat(time: number) {
  const date = new Date(time);
  return (
    date.getFullYear() +
    '-' +
    padStart(String(date.getMonth() + 1), 2, '0') +
    '-' +
    padStart(String(date.getDate()), 2, '0') +
    ' ' +
    padStart(String(date.getHours()), 2, '0') +
    ':' +
    padStart(String(date.getMinutes()), 2, '0') +
    ':' +
    padStart(String(date.getSeconds()), 2, '0')
  );
}

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

/**
 * 时间格式化
 * time {Number} 时分秒毫秒数
 * fmt {String} 格式
 */
export function timeFormat(time: number, fmt: string = 'hh:mm:ss'): string {
  return fmt
    .replace('hh', String(Math.floor(time / ONE_HOUR)).padStart(2, '0'))
    .replace('mm', String(Math.floor((time % ONE_HOUR) / ONE_MINUTE)).padStart(2, '0'))
    .replace('ss', String(Math.floor(((time % ONE_HOUR) % ONE_MINUTE) / ONE_SECOND)).padStart(2, '0'));
}

/**
 * 计算服务器时间与本地时间差
 * t 服务器标准时间格式
 * */
export function serverDiffTime(t: any) {
  const serveTime: Date = new Date(t);
  const year: number = serveTime.getUTCFullYear();
  const mouth: number = serveTime.getUTCMonth();
  const d: number = serveTime.getUTCDate();
  const h: number = serveTime.getUTCHours();
  const m: number = serveTime.getUTCMinutes();
  const s: number = serveTime.getUTCSeconds();
  const ss: number = serveTime.getUTCMilliseconds();
  const diffTime = new Date(year, mouth, d, h, m, s, ss).getTime() - new Date(serveTime).getTime();
  // console.log('服务器时间===', new Date(year, mouth, d, h, m, s, ss));
  // console.log('本地时间===', new Date(serveTime));
  // console.log('服务器与本地时间差=', diffTime / 3600000, '小时');
  return diffTime;
}
