interface ConfigItem {
  noErrTip: boolean;
  noLoading: boolean;
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
  'member/token': { noErrTip: false, noLoading: false },
  'member/balance': { noErrTip: true, noLoading: false },
  'member/deposit': { noErrTip: false, noLoading: false, errTxt: '存款失败' },
  'game/balance': { noErrTip: true, noLoading: false, header: { key: 'p' } },
  'game/transfer': { noErrTip: true, noLoading: true, header: { key: 'p' } },
  'game/launch': { noErrTip: false, noLoading: true, header: { key: 'p' } },
  'game/launch/v2': { noErrTip: false, noLoading: true, header: { key: 'p' } },
  'game/transferout': { noErrTip: true, noLoading: true, header: { key: 'p' } },
  'member/checkpassword': { noErrTip: true, noLoading: true },
  'member/login': { noErrTip: true, noLoading: false },
  'member/message/list': { noErrTip: true, noLoading: false },
  'plat/balance': { noErrTip: true, noLoading: false },
  'member/available': { noErrTip: true, noLoading: false },
};

export default config;
