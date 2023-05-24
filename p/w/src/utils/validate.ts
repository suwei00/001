import Toast from '@template-components/toast';

const useIn8 = require(`@/language/${globalConfig.LANG}`);
// 开头不为0的9位数字
export const phoneRegexp = /^(?!0)\d{9}$/;
// 用户名验证,5-14位数字字母，开头一位必须是字母
export const usrRegexp = /^[a-zA-Z]{1}[a-zA-Z0-9]{4,14}$/;
// 密码验证，8-20位数字字母组合
export const pwdRegexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
// 验证码验证
export const codeRegexp = /^[0-9a-zA-Z]{4,8}$/;
export const mailRegxp = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export const codeRegxp = /^[A-Za-z0-9]{4}$/;
export const phoneCodeRegxp = /^[A-Za-z0-9]{6}$/;
export const mailCodeRegxp = /^[A-Za-z0-9]{6}$/;
// 验证银行卡号
export const isBankCards = /^[0-9]{6,20}$/;


/**
 * @description 验证手机号
 * @export
 * @param {string} value
 * @param {string} [prop='vi']
 * @return {*}
 */
export function isPhone(value: string, prop: string = 'vi') {
  const reg: Map = {
    vi: /^(?!0)\d{9}$/.test(value),
    zh: /^[1][3456789]\d{9}$/.test(value)
  };
  return reg[globalConfig.LANG];
}
interface Map {
  [prop: string]: boolean;
}
// 验证密码
export function isPassword(value: string): boolean {
  const obj: any = {
    vi: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
    zh: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
  };
  const reg: any = obj.zh;
  return reg.test(value);
}

// 验证手机号
export function isTel(value: string, prop: string = 'vi') {
  const reg: Map = {
    vi: /^0[0-9]{9}$/.test(value),
    zh: /^[1][3456789]\d{9}$/.test(value)
  };
  return reg[prop];
}
// 验证用户名
export function isUserName(value: string): boolean {
  return /^[a-zA-Z]{2}[0-9a-zA-Z]{2,7}$/.test(value);
}

// 用户名效验规则
export const userReg: any = {
  // 2位字母开头+10位字符
  vi: /^[a-zA-Z]{2}[0-9a-zA-Z]{2,10}$/g,
  zh: /^[a-zA-Z]{2}[0-9a-zA-Z]{2,7}$/g
};

export const passwordReg: any = {
  vi: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/g,
  zh: /^[1][3456789]\d{9}$/g
};
export const notInputChLange = (value: string): string => {
  return value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g, '');
};
// 只能输入字母和空格
export function isOnlyInputVi(value: string): string {
  return value.replace(/[^\a-\z\A-\Z\s]/g, '');
}

// 只能输入英文和正数
export function isEnOrInteger(value: string): string {
  return value.replace(/[^\a-\z\A-\Z0-9]/g, '');
}

// 只能输入数字
export function onlyInputNumber(value: string): string {
  return value.replace(/[^\d]/g, '');
}

// 验证344格式的手机号
export function checkPhone(value: string, callback: (arg?: any) => void) {
  if (!value) {
    return callback(new Error(useIn8.addBank.phoneError));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{10}$/;
    if (reg.test(value.replace(/\D/g, ''))) {
      callback();
    } else {
      return callback(new Error(useIn8.addBank.phoneError));
    }
  }
}

// 验证验证码
export function isCode(value: string) {
  return /^\d{6}$/.test(value);
}

// 验证邮箱
export function isEmail(value: string) {
  if (value.trim() === '') {
    Toast(useIn8.email_error);
    return false;
  }
  let reg = new RegExp(/^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);

  if (reg.test(value)) {
    return true;
  }
  Toast(useIn8.email_error);
  return false;
}


// 验证银行卡号
export function isBankCard(value: any) {
  return /^[0-9]{6}$/.test(value);
}

// 验证身份证号码
export function isId(value: string) {
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
}

// 验证真实姓名 (只能是2-3位中文)
export const isZhRealName = (value: string) => {
  return /^[\u4E00-\u9FA5]{2,4}$/.test(value);
};

/* 判断平年闰年 y:年份数字，四位*/
function isOrdinaryYear(y: number) {
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
    return false;
  }
  return true;
}
// 只能输入正整数
export const isInteger = (target: any) => {
  const val = target.replace(/[^\d]/g, '');
  return val;
};

// 验证是否满18岁或大于70岁
export const satisfyEight = (bothDate: number | string) => {
  const nowDate = new Date(); // 当前时间
  const mouth = nowDate.getMonth() + 1;
  let day = nowDate.getDate();
  const year = nowDate.getFullYear() - 18;
  const maxYear = new Date('1921-01-01 00:00:00').getTime();
  if (mouth === 2 && day >= 28) {
    day = isOrdinaryYear(year) ? 28 : 29;
  }
  const oldDate = new Date(year + '-' + mouth + '-' + day).getTime();
  return oldDate > bothDate && bothDate >= maxYear;
};

export const checkEmptySPace = (value: string) => {
  let len = value.split(' ').length - 1;
  return len > 0 && len <= 4;
};
