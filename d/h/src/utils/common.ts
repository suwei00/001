/* eslint-disable */
/*
 * @Author: Seanm
 * @Date: 2021-03-24 17:14:20
 */

import { isPhone } from './validate';
import { copy as copyClipboard } from 'clipboard'
import dayjs from 'dayjs';
/**
 * 对列表按指定字段排序
 * @param {*} list
 * @param {*} filedName 排序字段
 * @param {*} order 默认升序，降序(desc)
 */
export function listOrderByField(list: any, fieldName: string, order: string = '') {
  let temp;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i; j++) {
      if (list[j][fieldName] > (list[j + 1] && list[j + 1][fieldName])) {
        temp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = temp;
      }
    }
  }
  if (order === 'desc') {
    list = list.reverse();
  }
  return list;
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat: string): string {
  if (arguments.length === 0 || !time) {
    return '';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: any;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        // tslint:disable-next-line:radix
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 * @description: 将手机 xxx****xxx 和邮箱 xx****@xxx.com 字符串
 * @param {string} str
 * @return {string} str
 */
export function formatStringOfAsterisk(str: string): string {
  if (isPhone(str)) {
    return str.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
  } else if (str.indexOf('@') !== -1) {
    return str.replace(str.substring(2, str.lastIndexOf('@')), '****');
  }
  return str;
}

/**
 * @description: 将 2020-01-01 格式转换成 [2021, 1, 1]
 * @param {string} date
 * @return {*}
 */
export function getDateArray(date: string): number[] {
  const arr = date.split('-');
  return arr.map((item): number => {
    return item[0] === '0' ? parseInt(item[1], 10) : parseInt(item, 10);
  });
}

/**
 * @description: DatetimePicker年月日格式化
 * @param {string} datetype
 * @param {string} val
 * @return {*}
 */ interface KeyMap {
  [prop: string]: string;
}
interface DateFormatter extends KeyMap {
  year: string;
  month: string;
  day: string;
}
export function formatter(datetype: string, val: string): string {
  if (val.indexOf('0') === 0) {
    val = val.substring(1);
  }
  const map: DateFormatter = {
    year: '年',
    month: '月',
    day: '日'
  };
  return `${val + map[datetype]}`;
}

/**
 * @description: 复制功能
 * @param {*} val
 * @return {*}
 */
export function copy(val: string): void {
  copyClipboard(val)
}
// 复制操作
export const newCopy = (dom: any, cb?: (text: string) => void) => {
  const text = copyClipboard(dom)
  return cb?.(text)
}

function doHandleMonth(month: number) {
  let m: string = month.toString();
  if (month.toString().length === 1) {
    m = '0' + month.toString();
  }
  return m;
}
/**
 * @description: 获取距离当天的日期
 * @param {*} day 距离当天的天数
 * @return {*}
 */
export function getDate(day: number) {
  const today = new Date();
  const interval = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(interval);
  const tYear = today.getFullYear();
  const tMonth = doHandleMonth(today.getMonth() + 1);
  const tDate = doHandleMonth(today.getDate());
  return tYear + '-' + tMonth + '-' + tDate;
}

/**
 * @description: 转换为货币格式
 */
export function formatNumberToCurrency(value: string | number): string {
  if (value) {
    if (typeof value === 'number') {
      value = value.toString();
    }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return value + '';
  }
}

/**
 * @description: 人民币转usdt
 * @param {*} amount 人民币金额
 */
// const RATE = [6.6966, 23.0];
interface RateMap {
  [prop: string]: number;
}
const RATE: RateMap = {
  zh: 6.6933,
  vi: 23.533
};

export function exchangeRate(amount: number, currency: string = 'vi', rate: number = 23.533) {
  return Number((amount / rate).toFixed(4));
}

/**
 *  精确小数点
 *  l 小数点位数
 *  不四舍五入
 * */
export function toFixedN(value: number, l: number = 2) {
  if (!value) return '0.00';
  const str = value.toString().split('.');
  const str1 = str[1] ? str[1].substr(0, l).padEnd(l, '0') : ''.padEnd(l, '0');

  return str[0] + '.' + str1;
}

// 检测表单是否全部有值
export function isFormReady<T>(form: T, except?: string[]): boolean {
  for (const i in form) {
    if (except && except.indexOf(i) !== -1) continue;
    if (!form[i]) return true;
  }
  return false;
}

export function debounce(fn: () => void, wait: number) {
  let timer: NodeJS.Timeout | null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}
// 转义
export function escape2Html(str: string): string {
  const arrEntities: { [prop: string]: string } = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|amp|quot|nbsp);/gi, (all, t: string): string => {
    return arrEntities[t];
  });
}

// 格式化金额 0位小数
export function formatAmount(str: string | number) {
  const st = str.toString();
  return st.split('.')[0];
}

export const uuid = () => (1e7 + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, (c: any) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url: string) => {
  const arr: any[] = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  return arr.reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
};

export const toFiexd = (n: number | string, fiexd: number): string => {
  const str = n.toString();
  const index = str.indexOf('.');
  if (index > 0) return str.substring(0, index + fiexd + 1);
  else return str;
};

export function iconUrl(path: string = '') {
  const str = path.replace(/^\/images/g, `/${globalConfig.SITE}-images`);
  return globalConfig.APP_CDN_URL + str;
}

interface Data {
  [key: string]: any;
}
type ActionFunc = <T>(data: T) => void;
interface ActionData {
  key: string;
  func: ActionFunc;
}
export class Communicator {
  static action = (action: string, data: Data): boolean => {
    const listKey = Communicator.strToListenerList(action);
    if (Communicator[listKey] && Array.isArray(Communicator[listKey])) {
      Communicator[listKey].forEach(({ func }: ActionData) => {
        func(data);
      });
      return true;
    }
    return false;
  };
  static strToListenerList = (str: string): string => {
    const newStr = `${str}other_List`;
    return newStr;
  };
  static getListenerList = (ListenerName: string): [] => {
    try {
      const listKey = Communicator.strToListenerList(ListenerName);
      if (!Communicator[listKey]) throw new Error(`${ListenerName}not Fund`);
      console.log('Communicator.[listKey]', Communicator[listKey]);
      return Communicator[listKey];
    } catch (error) {
      return [];
    }
  };
  static createListener = (ListenerName: string, func: ActionFunc): ActionData | null => {
    try {
      const listKey = Communicator.strToListenerList(ListenerName);
      if (!Communicator[listKey]) Communicator[listKey] = [];
      const item: ActionData = {
        key: ListenerName,
        func
      };
      Communicator[listKey].push(item);
      return item;
    } catch (error) {
      return null;
      // throw error;
    }
  };
}

export function urlToOrigin(str: string) {
  return new URL(str).origin;
}


export function getServiceUrl(path: string) {
  // @ts-ignore
  if (process.env.NODE_ENV === 'development') {
    return globalConfig.APP_CDN_URL + '/' + path;
  } else {
    return window.location.origin + '/' + path;
  }
}

export function getLangPath() {
  const l = ['zh', 'zh-CN'].indexOf(globalConfig.LANG) > -1 ? 'zh' : globalConfig.LANG;
  return `${globalConfig.STATIC_CDN_URL}/lang/error/` + l + '.json';
}

/**
 * 根据value，获取传递给后端的排序字段
 * @param value sort|field|0
 */
export function getSortFormData(map: { [key: string]: number | string }) {
  const _map: any = {};
  for (const key in map) {
    if (map.hasOwnProperty(key)) {
      const value = map[key].toString();
      const arr = value.split('|');
      if (arr.length === 3) {
        const sort = arr[0];
        const sort_field = arr[1];
        const is_asc = arr[2];
        if (sort === 'sort') {
          _map.sort_field = sort_field;
          _map.is_asc = is_asc;
        }
      } else {
        _map[key] = value;
      }
    }
  }
  return _map;
}

/**
 * 转换时间筛选，如果是自定义，传start_time和end_time,不是传1，2，3，4
 */
export const transformTimeFormData = (map: { [key: string]: number | string }, typeStr: string) => {
  const _obj = {
    ...map
  }
  // 根据start_time是不是空，判断是否是自定义
  if (!_obj.start_time) {
    delete _obj.start_time;
    delete _obj.end_time;
  } else {
    delete _obj[typeStr];
    // 转换成年月日 时分秒

    // _obj.start_time以/分割转换成数组，然后倒序，再以-拼接
    _obj.start_time = _obj.start_time.toString().split('/').reverse().join('-');
    _obj.end_time = _obj.end_time.toString().split('/').reverse().join('-');
    _obj.start_time = dayjs(_obj.start_time).format('YYYY-MM-DD 00:00:00');
    _obj.end_time = dayjs(_obj.end_time).format('YYYY-MM-DD 23:59:59');
  }
  // console.error('_obj', _obj);
  return _obj;
}