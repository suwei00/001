import http, { getData, logAxiosInstance } from './core';
import user from './modules/user';
import { encrypt } from 'xxtea_ts';
import { getBrowser, getOSInfo } from '@/utils/helpers';
// 返回类型
export type ResponseType<T = any> = Promise<{ status: boolean; data: T }>;

/**
 *注册
 * @param {*} data
 * {
 *  id
 *  name
 *  code
 *  password1
 *  password2
 * }
 */
export function register(data: ObjectParams = {}) {
  return http.post('member/reg', data);
}

/**
 *登录
 * @param {*} data
 * {
 *    name
 *    password
 * }
 */
export function login(data: ObjectParams = {}) {
  return http.post('member/login', data);
}

export function logout() {
  return http.get('member/logout');
}
/**
 * @description 发送离线短信验证码 注册
 * @export
 * @param {{ username: string; tel: string; flag: string; ty: number }} data
 * @return {*}
 */
export function sendOfflineSms(data: { username: string; tel: string; flag: 'text' | 'voice'; ty: 1 | 2 }) {
  return http.post('sms/offline', data);
}
/**
 * @description 修改登录密码
 * @export
 * @param
 * @return {*}
 */
export function modifyPsw(data: ObjectParams = {}) {
  return http.post('sms/online', data);
}
/**
 * @description 在线邮件验证码
 * @export
 * @param
 * @return {*}
 */
export function mailOnline(data: ObjectParams = {}) {
  return http.post('mail/online', data);
}
/**
 * 获取图形验证码
 */
export function getImgCode(params: ObjectParams = {}) {
  return http.get('member/captcha', { params, responseType: 'blob' });
}

/**
 * 获取场馆数据
 * @param {*} params
 */
export function getVenueData(params: ObjectParams = {}) {
  return http.get('member/nav', { params });
}

/**
 * 进入场馆
 * @param {*} params
 * {
 *  i
 * }
 */
export function launchVenue(params: ObjectParams = {}) {
  return http.get(`game/launch`, { params });
}
export function launchPlat(params: { id: string; code?: string }) {
  const { id, code } = params;
  const p = code ? { id, code } : { id };
  return http.get(`plat/launch/${id}`, { params: p });
}
export function launch1(params: { id: string; code?: string }) {
  console.log('🚀 ~ file: APIs.ts ~ line 92 ~ launch1 ~ launch1', params);
  const { id, code } = params;
  const p = code ? { id, code } : { id };
  return http.get(`plat/launch/${id}`, { params: p });
}
export function launch2(params: { id: string; code?: string }) {
  console.log('🚀 ~ file: APIs.ts ~ line 100 ~ launch2 ~ launch2', params);
  const { id, code } = params;
  const p = code ? { id, code } : { id };
  return http.get(`plat/launch/${id}`, { params: p });
}
export function singleLaunch(params: ObjectParams = {}) {
  return http.get('game/single/launch', { params });
}
export function launch(params: ObjectParams = {}) {
  const { id, code } = params;
  delete params.id;
  if (!code) {
    delete params.code;
  }
  return http.get(`plat/launch/${id}`, { params });
}
/**
 * 场馆钱包列表
 */
export function getVenueWalletList() {
  return http.get('member/platform') as ResponseType<
    Array<{ id: string; name: string; wallet_id: string; wallet_name: string; game_type: number; maintained: number; flags: number; state: number; seq: number }>
  >;
}

/**
 *
 * 根据场馆ID获取余额
 * @param {*} params
 */
export function getBalanceByVenueId(params: ObjectParams = {}) {
  const { id } = params;
  return http.get(`plat/balance/${id}`, { params });
}

/**
 * 转账
 * @param {*} data
 * {
 *  amount 转账金额
 *  flags 转账类型(in或者out)
 *  id  场馆id
 * }
 */
export function transfer(data: { pid: string; ty: number }) {
  return http.post('plat/transfer', data);
}

export function getGameTypeList(tabId?: string) {
  return http.get(`member/gamelist`, { params: { pid: tabId } });
}
export function getEgameList(params: ObjectParams = {}) {
  return http.post(`member/slot/search`, params);
}
export function getSlotList(params: ObjectParams = {}) {
  return http.get(`member/slot/list`, { params });
}

// 获取优惠活动类型
export function getActiviryType() {
  return http.get('member/tree', { params: { id: '008' } }).then(res => {
    if (res.status) {
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve([]);
    }
  });
}

// json
export function getJsonbyId(id: string) {
  return http.get('member/tree', { params: { id } });
}

/* 一键回收功能 */
export function transferout(params: ObjectParams = {}) {
  return http.get('game/transferout', { params });
}

/**
 * 一键回收
 * amount = 2 元
 * flags = in
 * id = 1055235995899664907
 * */
export function recycleMoney(query = {}) {
  const url = 'game/transfer';
  return http.get(url, { params: query });
}

/**
 * 检测名字是否可用
 * @param params {
 *  username {String} 用户名
 * }
 */
export function checkUsernameAvailable(params: ObjectParams = {}) {
  return http.get('member/available', { params });
}
// 获取web广告列表
export function getBannerJson(params: any) {
  return http.get('member/banner', { params }) as ResponseType<any>;
}

/**
 * 获取手机验证码
 * @param data
 */
export function getPhoneCode(data: ObjectParams = {}) {
  return http.post('service/sms', data);
}

/**
 * 获取邮箱验证码
 * @param data
 */
export function getMailCode(data: ObjectParams = {}) {
  return http.post('service/mail', data);
}
export function getMailCode2(data: ObjectParams = {}) {
  return http.post('member/email', data);
}
/**
 * 重置密码
 * @param data
 */
export function resetPwd(data: ObjectParams = {}) {
  return http.post('member/password/forget', data);
}

/**
 * @description 获取头部nav
 * @export
 * @return {*}
 */
export function getPlatList() {
  return http.get('member/nav');
}

export function getHomeMarquee(params: ObjectParams = {}) {
  return http.get('member/message/marquee', { params });
}
// 获取支付通道
export function getFinanceCate() {
  return http.get('finance/cate') as ResponseType<Array<{ id: string; name: string; promo_discount: string; promo_state: string; sort: number }>>;
}

export function manualyPay(params: ObjectParams = {}) {
  return http.post('finance/manual/pay', params);
}

export function manualyBankList(params: ObjectParams = {}) {
  return http.post('finance/bankcard/list', params);
}
/**
 * @description 获取某个支付通道的渠道信息
 * @export
 * @param {ObjectParams} [data={}]
 * @return {*}
 */
export function getFinanceTunnelById(id: string) {
  return http.get('finance/tunnel', { params: { id } }) as ResponseType<
    Array<{
      id: string;
      bank: Array<{ bank_id: string; id: string; code: string; sort: number; name: string }>;
      fmin: string;
      fmax: string;
      amount_list: string;
      sort: string;
      payment_name: string;
    }>
  >;
}
export function FinacePay(data: ObjectParams = {}) {
  return http.post('finance/pay', data) as ResponseType<{ id: string; url: string; useLink: string }>;
}

/**
 * @description 离线支付
 * @export
 * @param {ObjectParams} [data={}]
 * @return {*}
 */
export function FinaceManualPay(data: ObjectParams = {}) {
  return http.post('finance/manual/pay', data);
}
/**
 * @description 根据订单号查询此订单的扫码支付界面数据
 * @export
 * @param {string} order_no
 * @return {*}
 */
export function getP3PayDetail(order_no: string) {
  return http.post('finance/qrDetail', { order_no });
}

/**
 * @description 获取站内信未读数量
 * @export
 * @return {*}
 */
export function getMessageNum() {
  return http.get('member/message/num');
}
export function resetPassword(params: ObjectParams = {}) {
  return http.post('member/password/forget', params);
}
/**
 * @description 获取紧急站内信
 * @export
 * @return {*}
 */
export function getEmergency() {
  return http.get('member/message/emergency') as ResponseType<{ title: string; content: string; ts: string }>;
}

export function hotMatch() {
  return http.get('member/popularevents');
}

export function jackpot() {
  return http.get('member/slot/bonus');
}
export function getMemeberVips() {
  return http.get('member/vips');
}
/**
 * @description 获取会员配置
 * @export
 * @return {*}
 */
export function getVipConfig() {
  return http.get('member/vip/config');
}
export function getRabet() {
  return http.get('member/rebate');
}
export function getThirdAgency(data: ObjectParams = {}) {
  return http.get('member/agency', { params: data });
}

export function getPromoPlatTransfer(params: ObjectParams = {}) {
  return http.get('promo/plat/transfer', { params });
}

export function getTransactionList(params: ObjectParams = {}) {
  return http.get('member/record/transaction', { params });
}

export function getCommissionList(params: ObjectParams = {}) {
  return http.get('member/record/commission', { params });
}

// 获取会员返水比例
export function getRabetScale() {
  return http.get('member/rebate/scale');
}

// 新增下级
export function memberInsert(data: ObjectParams = {}) {
  return http.post('member/insert', data);
}

// 添加推广链接
export function memberLinkInsert(data: ObjectParams = {}) {
  return http.post('member/link/insert', data);
}

// 推广链接列表
export function getLinkList() {
  return http.get('member/link/list');
}

// 删除推广链接
export function memberLinkDelete(params: ObjectParams = {}) {
  return http.get('member/link/delete', { params });
}

// 会员列表
export function memberList(params: { page: string; page_size: string; username?: string; agg?: number; parent_name?: string; ty: string, sort_field?: string, is_asc?: string }) {
  return http.get('member/list', { params });
}

/**
 * @description 获取游戏投注记录
 * @export
 * @param {({ page: number; page_size: number; flag: 0 | 1 | 2 | 3; platform_id?: number; start_time: string; end_time: string; ty?: number; player_name?: string })} params
 * @return {*}
 */
export function getGameRecord(params: any) {
  return http.get('member/record/game', { params });
}
// 返水日志
export function getRebateRecord(params: any) {
  return http.get('member/rebate/list', { params });
}
// 会员列表-编辑
export function memberRebateUpdate(data: ObjectParams = {}) {
  return http.post('member/rebate/update', data);
}
// 会员代理福利列表
export function getVipConfigList(params: any) {
  return http.get('member/vip/config', { params });
}
// 检测提款密码
export function memberCheckPassword() {
  return http.get('member/password/check');
}

// 佣金提取
export function commissionDraw(data: ObjectParams = {}) {
  return http.post('member/commission/draw', data);
}

// 佣金发放
export function commissionRation(data: ObjectParams = {}) {
  return http.post('member/commission/ration', data);
}
export function memberNotices(params: ObjectParams = {}) {
  return http.get('member/notices', { params });
}
// 代理报表
export function agencyReportList(data: ObjectParams = {}) {
  return http.post('member/agency/report', data);
}
// 绑定zalo号
export function memberZalo(data: ObjectParams = {}) {
  return http.post('member/bindzalo', data);
}
// 绑定邮寄地址
export function bindAddress(data: ObjectParams = {}) {
  return http.post('member/update', data);
}
// 活动全部列表
export function getPromotionList(params: ObjectParams = {}) {
  return http.get('promo/list', { params }) as ResponseType<
    Array<{
      flag: string;
      id: string;
      state: number;
      static: {
        list_web: string;
      };
    }>
  >;
}
// 活动详情
export function getPromotionDetail(params: any) {
  return http.get('promo/detail', { params }) as ResponseType<any>;
}
/**
 * @description 获取上一次成功提款后的存款详情
 * @export
 * @return {*}
 */
export function getPromoDepDetail() {
  return http.get('promo/deposit/detail') as ResponseType<any>;
}
/**
 * @description 查看首存活动申请状态
 * @export
 * @param {{ id: number; flag: string }} params
 * @return {*}
 */
export function getFirAppDetail(params: { id: number; flag: string }) {
  return http.get('promo/apply/status', { params }) as ResponseType<any>;
}
// 投注活动-查询前日是否有满足要求的投注
// /promo/cgcpbet
export function getPromoCgcpbet(params: ObjectParams = {}) {
  return http.get('promo/cgcpbet', { params });
}
// 活动申请
export function getPromotionApply(data: any) {
  return http.post('promo/apply', data) as ResponseType<any>;
}

// 活动 救援金 查询前日输赢
export function getPromotionProfit(params: ObjectParams = {}) {
  return http.get('promo/rescue/profit', { params });
}
// 编辑头像
export function updateAvatar(params: ObjectParams = {}) {
  return http.get('member/avatar/update', { params });
}
// 成员名单单条详情
export function memberListDetail(params: ObjectParams = {}) {
  return http.get('member/rebate/detail', { params });
}
// 成员名单单条编辑
export function memberListUpdate(data: ObjectParams = {}) {
  return http.post('member/rebate/update', data);
}
/**
 * @description 前端监控-页面日志-新增
 * @export
 * @return {*}
 */
export function monitorWebInsert(data: {
  view_path: string;
  ip?: string;
  device: number;
  device_type?: string;
  uid?: string;
  username?: string;
  prefix: string;
  domain?: string;
  country?: string;
  region?: string;
  os_version?: string;
  bower_type?: string;
  os_type?: string;
  cost_time?: string;
  screen?: string;
  device_no?: string;
}) {
  return http.post('log/td/monitor/web/insert', data);
}
// 错误上报接口
export const ERR_INSERT_API = 'log/td/http/record/insert';
export function monitorErrorInsert(data: {
  api_path?: string;
  error_title: string;
  error_type: number;
  device?: number;
  device_type?: string;
  request_time: number;
  request_status: number;
  username: string;
  view_path?: string;
  uid?: number;
  error_file?: string;
  error_content?: string;
  os_type?: string;
  os_version?: string;
  bower_type?: string;
  bower_version?: string;
  code_version?: string;
  project?: string;
}) {
  const { type: bower_type, browser_version } = getBrowser();
  const { os_version, os } = getOSInfo();
  // 获取当前url
  const { pathname } = window.location;
  const obj = { view_path: pathname, project: 'p3-web', browser_version, bower_type, os_version, os_type: os, device: 24, device_type: bower_type + browser_version, ...data };
  const params = getData(obj);
  const d = encrypt(params, '3468719700');
  return logAxiosInstance.post(ERR_INSERT_API, d, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      d: 24
    }
  });
}

/**
 * @description 前端监控-接口日志-新增
 * @export
 * @return {*}
 */
export function monitorApiInsert(data: {
  api_path: string;
  ip: string;
  device: string;
  device_type?: string;
  uid?: string;
  username?: string;
  prefix?: string;
  api_domain?: string;
  country?: string;
  region?: string;
  os_version?: string;
  bower_type?: string;
  os_type?: string;
  request_time?: string;
  screen?: string;
  device_no?: string;
  request_status?: string;
}) {
  return http.post('log/td/monitor/api/insert', data);
}

// 所有下级投注明细
export function memberRecordBet(params: ObjectParams = {}) {
  return http.get('member/agency/record/game', { params });
}
/**
 * @description 代理报表下级明细
 * @export
 * @return {*}
 */
export function getReportSub(params: { ty: string; flag: string; username: string; page: string; page_size: string, is_asc?: string, sort_field?: string }) {
  return http.get('member/agency/report/sub', { params });
}
// 下级明细场馆输赢
export function getReportSubPlat(params: { ty?: string; username: string; }) {
  return http.get('member/agency/report/sub/plat', { params });
}
// 下级明细场馆余额
export function getReportSubBalance(params: { username?: string; }) {
  return http.get('member/agency/report/sub/balance', { params });
}
// 在线人数/member/online/count
export function getOnlineCount() {
  return http.get('member/online/count');
}
/**
 * @description 下级报表列表
 * @export
 * @return {*}
 */
export function getReportList(params: { player_name?: string; parent_name?: string; page: string; page_size: string; ty: string; is_online: string, sort_field?: string, is_asc?: string }) {
  return http.get('member/agency/report/list', { params }) as ResponseType<{ t: number; d: any[] }>;
}
/**
 * @description 所有下级交易记录
 * @export
 * @param {{ player_name?: string; page: string; page_size: string; flag: string; date_flag: string }} params
 * @return {*}
 */
export function getRecordTrade(params: { player_name?: string; username?: string; page: string; page_size: string; flag: string; date_flag: string; channel_id?: string, sort_field?: string, is_asc?: string }) {
  return http.get('member/agency/record/trade', { params }) as ResponseType<{ t: number; d: any[] }>;
}

// 最强大脑活动申请状态
export function getExamStatus(params: { id?: string }) {
  return http.get('/promo/exam/apply/status', { params }) as ResponseType<{ t: number; d: any[] }>;
}

// 最强大脑回答问题
export function submitAnswer(data: ObjectParams = {}) {
  return http.post('/promo/exam', data);
}

// 获取下一道题目
export function getNextExam(data: ObjectParams = {}) {
  return http.post('/promo/exam/next', data);
}

// 场馆检查是否维护和定时维护
export function getPlatformCheck(data: ObjectParams = {}) {
  return http.post('/member/platform/check', data);
}



const APIs = {
  getPlatformCheck,
  submitAnswer,
  getNextExam,
  getExamStatus,
  getFinanceCate,
  getFinanceTunnelById,
  FinacePay,
  register,
  getGameTypeList,
  getImgCode,
  login,
  getVenueData,
  launchVenue,
  launch2,
  getVenueWalletList,
  getBalanceByVenueId,
  transfer,
  manualyPay,
  manualyBankList,
  transferout,
  recycleMoney,
  checkUsernameAvailable,
  getPhoneCode,
  getMailCode,
  resetPwd,
  getBannerJson,
  ...user,
  getPlatList,
  getHomeMarquee,
  logout,
  getMessageNum,
  resetPassword,
  getActiviryType,
  getEgameList,
  getSlotList,
  hotMatch,
  jackpot,
  getMemeberVips,
  getRabet,
  getThirdAgency,
  getPromoPlatTransfer,
  singleLaunch,
  launch,
  getTransactionList,
  getRabetScale,
  memberInsert,
  memberLinkInsert,
  getLinkList,
  memberLinkDelete,
  memberList,
  launch1,
  memberRebateUpdate,
  memberCheckPassword,
  commissionDraw,
  commissionRation,
  memberNotices,
  getMailCode2,
  getJsonbyId,
  getCommissionList,
  agencyReportList,
  memberZalo,
  bindAddress,
  getPromotionList,
  getPromotionDetail,
  getPromotionApply,
  getPromotionProfit,
  FinaceManualPay,
  updateAvatar,
  memberListDetail,
  memberListUpdate,
  modifyPsw,
  mailOnline,
  memberRecordBet,
  getPromoCgcpbet,
  getOnlineCount,
  getVipConfigList
};

export default APIs;
