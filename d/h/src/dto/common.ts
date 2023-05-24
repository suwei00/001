/*
 * @Author: Seanm
 * @Date: 2021-03-31 20:09:14
 */
export interface KeyMap<T> {
  [prop: string]: T;
}

// 手机验证 & 邮箱验证
export interface Form {
  [prop: string]: string;
}
export interface BankAndCoin {
  [prop: string]: boolean;
  valid: boolean;
  phoneCheck: boolean;
}
export interface BooleanMap {
  [prop: string]: boolean;
  // valid: boolean;
  // error: boolean;
  // phoneClose?: boolean;
  // emailClose?: boolean;
  codeClose: boolean;
  captchaClose: boolean;
  finised: boolean;
}
export interface Check {
  blur: () => void;
  checkValue: () => void;
  clearValue: () => void;
  changeCode: () => void;
}

export interface Page {
  page: number;
  page_size: number;
}

/*
 * @Author: Jasper
 * @title: 一级菜单显示标题
 * @secondMenu: 二级菜单
 * @isShowTip: 是否显示30天查询的提示语
 * @key: 数据返回的关键字
 * @index: 默认选中二级菜单的索引
 * @isShow: true 控制一级菜单的显示
 */
export interface SelectorItem {
  title: string;
  secondMenu: SecondMenu[];
  isShowTip?: boolean;
  key: string;
  index: number;
  isShow: boolean;
}
/*
 * @Author: Jasper
 * @title: 二级菜单显示标题
 * @value: 值
 * @isCustomDate: 是否是自定义日期 可不传
 */
export interface SecondMenu {
  title: string;
  value: any | ObjectParams;
  isCustomDate?: boolean;
}

export interface QueryDate extends KeyMap<string> {
  start: string;
  end: string;
}

export interface Wallet {
  id: string;
  name: string;
  seq: number;
  wallet: number;
  amount: string;
  isLoading: boolean;
  game_code: string;
  wallet_id: string;
}
