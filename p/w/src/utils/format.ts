import { toNumber } from 'lodash';
/**
 * @description: 转换为货币格式
 */
export function formatNumberToCurrency(value: string | number = '', suffix = 'K'): string {
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
  const dec = strList[1] ? `.${strList[1].substring(0, 2)}` : '';
  if (suffix) {
    const a = strList[0].replace(reg, '$&' + ',') + dec.replace('.00', '') + 'K'
    return a === '0K' ? '0' : a;
  }
  return strList[0].replace(reg, '$&' + ',') + dec.replace('.00', '');
}

export function formatNumToCurrency2Decimal(value: string, suffix = 'K'): string {
  if (!value) return '0';
  const r = toNumber(value);
  return formatNumberToCurrency(r, suffix);
}

/**
 * @description 金额结尾加K,n为保留的小数位
 * @export
 * @param {string} value
 * @return {*}  {string}
 */
export function formatNumToCurrencyWithK(value: string, n = 0): string {
  if (!value || value === '0') return '0';
  const r = toNumber(value);
  let rInt: number;
  if (!n) {
    rInt = r > 0 ? Math.floor(r) : Math.ceil(r);
  } else {
    rInt = +toTwoDecimals(r);
  }
  if (rInt === 0) return '0';
  return formatNumberToCurrency(rInt);
}

export function formatDecimal(num: number, decimal: number) {
  let n = num.toString();
  let index = n.indexOf('.');
  if (index !== -1) {
    n = n.substring(0, decimal + index + 1);
  } else {
    n = n.substring(0);
  }
  return parseFloat(n).toFixed(decimal);
}

export function colorSet(num: number) {
  console.log(num);

  if (num === 0) {
    return '#ffffff';
  } else if (num > 0) {
    return '#4FD864';
  } else if (num < 0) {
    return '#FC0505';
  }
}

// 乘法，解决失去精度问题
export function mul(num1: string, num2: string) {
  // 传参 数字1，数字2
  let str1 = num1;
  let str2 = num2;
  let m = 0;

  try {
    m += str1.split('.')[1].length;
  } catch (e) { }
  try {
    m += str2.split('.')[1].length;
  } catch (e) { }

  return (Number(str1.replace('.', '')) * Number(str2.replace('.', ''))) / Math.pow(10, m);
}

/**
 * @description 把字符串中的&nbsp;转成空格
 * @export
 * @param {string} str
 * @return {*}
 */
export function removeNbsp(str: string) {
  return str.replace(/&nbsp;/g, ' ');
}

/**
 * @description 格式化输入框的值为大写英文 空格分隔 （注意：最后一个空格不会被去掉）
 * @export
 * @param {string} str
 * @return {*}
 */
export function formatUpperName(str: string) {
  const val = str
    .replace(/[^0-9a-zA-Z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trimStart()
    .toUpperCase();
  return val;
}
export const removeDecimals = (num: number) => Math.floor(Math.abs(num));
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
 * 不足多少位补0
 */
export const toDecimalsLen = (num: number | string, len = 2) => {
  const list = num.toString().split('.');
  if (list.length === 1) {
    return list[0] + '.' + '0'.padEnd(len, '0');
  }
  return list[0] + '.' + list[1].padEnd(len, '0');
};


/**
* @description 分隔银行卡号，每4位一个空格
* @param {string} str
* @return {*}
*/
export const formatBankCard = (str: string) => {
  const reg = /(\d{4})(?=\d)/g;
  return str.replace(reg, '$1 ');
};

export function colorTransfer(num: number) {
  if (num === 0) {
    return 'var(--cg-color-grey1)';
  } else if (num > 0) {
    return 'var(--cg-color-blue12)';
  } else if (num < 0) {
    return 'var(--cg-color-red)';
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
    return 'var(--cg-color-red)';
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
    return 'red';
  }
}