interface ConfigItem {
  noErrTip: boolean;
  noLoading?: boolean;
  errTxt?: string;
  header?: any;
}

interface Config {
  [prop: string]: ConfigItem;
}

/**
 * 对不需要做请求，响应拦截处理的接口进行配置
 * 使用默认拦截处理的，则不需要在这里配置
 *
 * {
 *  noErrTip { Boolean }  是否禁用接口异常拦截
 *  errTxt { String } 接口失败默认提示信息
 * }
 */
const config: Config = {
  'member/token': { noErrTip: true, noLoading: false },
  'member/balance': { noErrTip: true, noLoading: false },
  'member/deposit': { noErrTip: false, noLoading: false, errTxt: '存款失败' },
  'member/login': { noErrTip: true },
  'member/reg': { noErrTip: true },
  'member/available': { noErrTip: true },
  'member/slot/search': { noErrTip: true },
  'member/slot/list': { noErrTip: true },
  'game/transfer': { noErrTip: true, header: { key: 'p' } },
  'game/launch': { noErrTip: true, noLoading: false, header: { key: 'p' } },
  'plat/launch': { noErrTip: true, noLoading: false, header: { key: 'p' } },
  'game/balance': { noErrTip: true, header: { key: 'p' } },
  'game/transferout': { noErrTip: true, header: { key: 'p' } },
  'member/slot/bonus': { noErrTip: true },
  'promo/sign': { noErrTip: true },
  'promo/resign': { noErrTip: true },
  'member/password/check': { noErrTip: true },
  'promo/apply': { noErrTip: true },
  'member/record/game': { noErrTip: true },
  'member/list': { noErrTip: true },
  'member/record/trade': { noErrTip: true },
  'finance/withdraw': { noErrTip: true },
  'log/td/monitor/web/insert': { noErrTip: true },
  'log/td/monitor/error/insert': { noErrTip: true },
  'plat/balance':{noErrTip: true}
  
};

export default config;
