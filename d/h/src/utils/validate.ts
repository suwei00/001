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
export function isPhone(value: string, prop: string = 'vi') {
  const reg: Map = {
    // vi: /^0[0-9]{9}$/.test(value),
    vi: /^[1-9][0-9]{8,9}$/.test(value),
    zh: /^[1][3456789]\d{9}$/.test(value)
  };

  return reg[prop];
}
// 验证用户名
export function isUserName(value: string): boolean {
  return /^[a-zA-Z]{1}[0-9a-zA-Z]{4,13}$/.test(value);
}

// 验证344格式的手机号
export function checkPhone(rule: any, value: string, callback: (arg?: any) => void) {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(value.replace(/\D/g, ''))) {
      callback();
    } else {
      return callback(new Error('请输入正确的手机号'));
    }
  }
}

// 验证验证码
export function isCode(value: string) {
  return /^[a-zA-Z0-9]{6}$/.test(value);
}
// 图形验证码
export function isCaptcha(value: string) {
  return /^[a-zA-Z0-9]{4}$/.test(value);
}
// 验证银行卡id
export function isCardId(value: string) {
  return /^\d{1,6}$/.test(value);
}
// 验证协议
export function isProtocol(value: string) {
  return /[0-9A-Za-z]{2,20}$/.test(value);
}
// 验证邮箱
export function isEmail(value: string) {
  return /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
}

// 验证银行卡号
export function isBankCard(value: string, prop: string = 'vi') {
  const reg: Map = {
    vi: /^[0-9]{6,20}$/.test(value),
    zh: /^[0-9]{6,30}$/.test(value)
  };
  return reg[prop];
}

// 验证地址
export function isBankAddres(value: string) {
  return /^([\u4e00-\u9fa5]{2,20})$/.test(value);
}
// 验证虚拟币别名
export function isAlias(value: string): boolean {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,10}$/.test(value);
}

// 验证虚拟币地址
export function isVirtualAddress(value: string): boolean {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,100}$/.test(value);
}
// 验证身份证号码
export function isId(value: string) {
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
}

// 验证真实姓名
export function isRealName(value: string, prop: string = 'vi') {
  const checkVi = () => {
    if (/^[A-Za-z0-9 ]{3,100}$/.test(value)) {
      const len = value.split(' ').length - 1;
      return len > 0 && len <= 9;
    } else {
      return false;
    }
  };
  const reg: Map = {
    vi: checkVi(),
    zh: /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,30}$/.test(value)
  };
  return reg[prop];
}

/* 判断平年闰年 y:年份数字，四位*/
function isOrdinaryYear(y: number) {
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
    return false;
  }
  return true;
}

// 验证是否满18岁
export function satisfyEight(bothDate: number) {
  const nowDate = new Date(); // 当前时间
  const mouth = nowDate.getMonth() + 1;
  let day = nowDate.getDate();
  const year = nowDate.getFullYear() - 18;
  if (mouth === 2 && day >= 28) {
    day = isOrdinaryYear(year) ? 28 : 29;
  }
  const oldDate = new Date(year + '-' + mouth + '-' + day).getTime();
  return oldDate < bothDate ? false : true;
}
