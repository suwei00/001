import { ref, Ref } from 'vue';
import { forEach } from 'lodash';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
require('dayjs/locale/vi');
export function formatGender(s: number): string {
  const gender = ['未选择', '男', '女'];
  if (gender[s]) {
    return gender[s];
  }
  return '';
}

export function formatTransactionType(i: string): string {
  const flagList: { [prop: string]: string } = {
    '1': '存款',
    '2': '取款',
    '3': '转账',
    '4': '红利',
    '5': '反水',
    '6': '加币',
    '7': '减币',
    '8': '调整'
  };
  if (flagList[i]) {
    return flagList[i];
  }
  return i;
}

export function formatTransactionState(s: string): string {
  const stateList: { [prop: string]: string } = {
    '0': '失败',
    '1': '成功',
    '2': '处理中',
    '3': '脚本确认中',
    '4': '人工确认中'
  };
  if (stateList[s]) {
    return stateList[s];
  }
  return s;
}

/**
 * @description: 转换为货币格式
 */
export function formatNumberToCurrencyWithoutK(value: string | number = ''): string {
  if (!value) return '0';
  let currency: string;
  if (typeof value === 'number') {
    currency = value.toString();
  } else {
    currency = value;
  }
  let result = mul(currency, '1').toString();
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  const strList = result.split('.');
  const dec = strList[1] ? `.${strList[1].substring(0, 4)}` : '';
  return strList[0].replace(reg, '$&' + ',') + dec;
}

/**
 * @description: 转换为货币格式
 */
export function formatNumberToCurrency(value: string | number = '', isK = true): string {
  if (!value) return '0';
  let currency: string;
  if (typeof value === 'number') {
    currency = value.toString();
  } else {
    currency = value;
  }
  let result;
  if (!isK) {
    result = mul(currency, '1000').toString();
  } else {
    result = currency;
  }
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  const strList = result.split('.');
  const dec = strList[1] ? `.${strList[1].substring(0, 2)}` : '';
  // const dec = '';
  if (isK) {
    const a = strList[0].replace(reg, '$&' + ',') + dec.replace('.00', '') + 'K'
    return a === '0K' ? '0' : a;
  }
  return strList[0].replace(reg, '$&' + ',') + dec.replace('.00', '');
}

export function formatNumToCurrency2Decimal(value: string | number, isK = true): string {
  if (!value) return '0';
  const r = Number(value.toString());
  return formatNumberToCurrency(r, isK);
}

export function negativeNumberProcess(value: any) {
  const r = value.toString();
  if (r.indexOf('-') >= 0) {
    return r.replace('-', '- ');
  } else {
    return r;
  }
}

/**
* @description 转化成货币格式 999,999
* @param {number} num
*/
export const toThousands = (num: number | string) => {
  const numStr = num + '';
  const index = numStr.indexOf('.');
  if (index === -1) return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return numStr.substring(0, index).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + numStr.substring(index);
};

/**
* @description 保留两位小数的货币格式
* @param {number} num
*/
export const toTwoDecimalsCurrency = (num: number) => toThousands(+toTwoDecimals(num));

/**
* @description
* @param {number} 保留两位小数,整数不保留
*/
export const toTwoDecimals = (num: number | string) => {
  const numStr = +num + '';
  const index = numStr.indexOf('.');
  if (index === -1) return +numStr;
  return +numStr.substring(0, index + 3);
};

/**
 *  精确小数点
 *  l 小数点位数
 * */
export function toNumber(value: number | string, l: number = 2) {
  if (!value) return '0.00';
  const str = value.toString().split('.');
  const str1 = str[1] ? str[1].substr(0, l).padEnd(l, '0') : ''.padEnd(l, '0');

  return Number(str[0] + '.' + str1);
}

export function colorSet(num: number) {
  if (num === 0) {
    return '#000000';
  } else if (num > 0) {
    return '#1DD40E';
  } else if (num < 0) {
    return '#E63838';
  }
}

// 乘法，解决失去精度问题
function mul(num1: string = '', num2: string = '') {
  // 传参 数字1，数字2
  const str1 = num1;
  const str2 = num2;
  let m = 0;

  try {
    const str1_arr = str1.split('.');
    if (str1_arr.length > 1) {
      m += str1_arr[1].length;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    const str2_arr = str2.split('.');
    if (str2_arr.length > 1) {
      m += str2_arr[1].length;
    }
  } catch (e) {
    console.log(e);
  }

  return (Number(str1.replace('.', '')) * Number(str2.replace('.', ''))) / Math.pow(10, m);
}
export function format(date: Date, fmt: string) {
  date = new Date(date);
  const o: any = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  }
  return fmt;
}

/**
 * @description 把后端返回的字符串用<p>这是分割线</p>拆分
 * @export
 * @param {string} str
 * @return {*}
 */
export function splitStr(str: string) {
  if (!str) return [];
  return str.split('<p>这是分割线</p>');
}

export const customizeAmountFilter = (value: any, decimal = 0, isAddK = true, minute = true, calculateK = false) => {
  if (value === undefined || value === null) return 0;
  const valueStr = value.toString();
  const bringDecimal = valueStr.indexOf('.') > -1 ? true : false;

  let leftNum = ''; // 整数
  let rightNum = ''; // 小数

  if (calculateK) {
    if (bringDecimal) {
      const valueStrArr = valueStr.split('.');
      const valueStr1 = valueStrArr[0];
      const valueStr2 = valueStrArr[1];

      const valueStr3 = String(valueStr1 / 1000);
      const valueStr3Arr = valueStr3.split('.');
      const valueStr3ArrStr1 = valueStr3Arr[0];
      const valueStr3ArrStr2 = valueStr3Arr[1];

      leftNum = valueStr3ArrStr1;
      rightNum = `${valueStr3ArrStr2}${valueStr2}`;
      rightNum = rightNum.substring(0, decimal);
    } else {
      const newValueStr = String(valueStr / 1000);
      const valueStrArr = newValueStr.split('.');
      const valueStr1 = valueStrArr[0];
      const valueStr2 = valueStrArr[1];

      leftNum = valueStr1;
      rightNum = valueStr2;
      rightNum = rightNum.substring(0, decimal);
    }
  } else {
    if (bringDecimal) {
      const valueStrArr = valueStr.split('.');
      const valueStr1 = valueStrArr[0];
      const valueStr2 = valueStrArr[1];

      leftNum = valueStr1;
      rightNum = valueStr2;
      rightNum = rightNum.substring(0, decimal);
    } else {
      leftNum = valueStr;
    }
  }

  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  if (minute) {
    leftNum = leftNum.replace(reg, '$&' + ',')
  }

  const newLeftRight = rightNum.length > 0 ? `${leftNum}.${rightNum}` : leftNum;
  if (isAddK) {
    return Number(newLeftRight) === 0 ? '0' : `${newLeftRight}K`;
  } else {
    return newLeftRight;
  }
}
export function colorTransfer(num: number) {
  if (num === 0) {
    return 'black1';
  } else if (num > 0) {
    return 'blue1';
  } else if (num < 0) {
    return 'red2';
  }
}
// 状态转颜色
export function colorFilter(state: number) {
  if ([361, 364, 371, 373, 376, 377, 378, 379, 231, 193, 194, 256].includes(state)) {
    // 黄色
    return 'var(--cg-color-orange)';
  } else if ([362, 374, 232, 192, 257, 1].includes(state)) {
    // 绿色
    return 'var(--cg-color-green)';
  } else if ([363, 372, 375, 376, 233, 191, 258].includes(state)) {
    // 红色
    return 'var(--cg-color-red2)';
  }
}

// 状态转颜色
export function colorFilter2(state: number) {
  if ([361, 364, 371, 373, 376, 377, 378, 379, 231, 193, 194, 256].includes(state)) {
    // 黄色
    return 'orange';
  } else if ([362, 374, 232, 192, 257, 1].includes(state)) {
    // 绿色
    return 'green';
  } else if ([363, 372, 375, 376, 233, 191, 258].includes(state)) {
    // 红色
    return 'red2';
  }
}

// 时间转换
export function timeFilter(ty: string) {
  // 如果ty=1
  switch (ty) {
    case '1':
      return [dayjs().locale('vi').startOf('day'), dayjs().locale('vi')];
    case '2':
      return [dayjs().locale('vi').subtract(1, 'day').startOf('day'), dayjs().locale('vi').subtract(1, 'day').endOf('day')];
    case '7':
      return [dayjs().locale('vi').startOf('week').startOf('day'), dayjs().locale('vi')];
    case '8':
      return [dayjs().locale('vi').subtract(1, 'week').startOf('week'), dayjs().locale('vi').subtract(1, 'week').endOf('week')];
    case '3':
      return [dayjs().locale('vi').startOf('month'), dayjs().locale('vi')];
    case '4':
      return [dayjs().locale('vi').subtract(1, 'month').startOf('month'), dayjs().locale('vi').subtract(1, 'month').endOf('month')];
    default:
      return [dayjs().locale('vi').startOf('day'), dayjs().locale('vi')];
  }
}

/**
* @description 分隔银行卡号，每4位一个空格
* @param {string} str
* @return {*}
*/
export const formatBankCard = (str: string) => {
  const reg = /(\d{4})(?=\d)/g;
  return str.replace(reg, '$1 ');
};

// 姓名显示 七位以上最后六位+* 七位以下最后一位*
export function nameFilterStar(name: string) {
  if (name && name.length && name !== '0') {
    if (name.length >= 7) {
      return name.substring(0,6) + '*';
    } else {
      return name.substring(0, name.length - 1) + '*';
    }
  }
  return '';
}