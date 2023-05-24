import http, { getData, logAxiosInstance } from './core';

import user from './modules/user';
import * as member from './modules/member';
import * as message from './modules/message';
import { getServerTime } from './modules/sysDate';
import { getServiceUrl } from '@/utils/common';
import base64 from 'base64-js';
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

/**
 * 获取图形验证码
 */
export function getImgCode(params: ObjectParams = {}) {
  return http.get('member/captcha', { params, responseType: 'blob' });
}

/**
 * 个人信息
 */
export function memeberInfo(data: ObjectParams = {}) {
  return http.get('member/info', data);
}

/**
 * 短信验证码
 */
export function mobileReg(data: ObjectParams = {}) {
  // return http.post('sms/mobile/reg', data);
  return http.post('sms/offline', data);
}

/**
 * 语音验证码
 */
export function mobileVoice(data: ObjectParams = {}) {
  return http.post('sms/offline', data);
}

/**
 * 获取场馆数据
 * @param {*} params
 */
export function getVenueData(params: ObjectParams = {}) {
  return http.get('member/nav', { params });
}

// 检查场馆是否接近维护时间
export function checkPlatformMaintain(data: ObjectParams = {}) {
  return http.post('member/platform/check', data);
}

/**
 * 电子游戏静态数据
 * @param {*} id
 */
export function getEgameData(params: ObjectParams = {}) {
  return http.get('member/slot/list', { params });
}

/**
 * 获取银行卡列表
 */
export function getBankList() {
  return http.get('member/tree', { params: { id: '010' } }).then(res => {
    if (res.status) {
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve([]);
    }
  });
}

/**
 * 获取首页banner
 * flag对应 1:APP闪屏页广告 2:轮播图广告 3:WEB体育场馆广告4:站点广告位。
 * device对应24:web 25:h5 26:ios 27:android 28:ios_sport29:android_sport 30:ios_agency 31:android_agency
 */
// export function getBanner(flag: number, device: number) {
//   return http.get(getServiceUrl(`json/banner_${flag}_${device}.json`));
// }

export function getBanner(params: ObjectParams = {}) {
  return http.get('member/banner', { params });
}

// 热门赛事
export function getPopularevents(params: ObjectParams = {}) {
  return http.get('member/popularevents', { params });
}
/**
 * 进入场馆
 * @param {*} params
 * {
 *  i
 * }
 */
export function launchVenue(params: ObjectParams = {}) {
  const { id, code } = params;
  console.log(params, '==========1111');
  return http.get(`plat/launch/${id}`, { params });
}

export function launch2(params: ObjectParams = {}) {
  const { id, code } = params;
  console.log(params, '==========2222');
  return http.get(`game/launch/v2/${id}`, { params });
}

export function memberList(params: ObjectParams = {}) {
  return http.get('member/list', { params });
}

export function addMember(data: ObjectParams = {}) {
  return http.post('member/insert', data);
}

export function updateMember(data: ObjectParams = {}) {
  return http.post('member/rebate/update', data);
}

export function linkList(params: ObjectParams = {}) {
  return http.get('member/link/list', { params });
}

export function rebateScale(params: ObjectParams = {}) {
  return http.get('member/rebate/scale', params);
}
export function addLink(data: ObjectParams = {}) {
  // console.log(data, 'data');
  return http.post('member/link/insert', data);
}
export function deleteLink(params: ObjectParams = {}) {
  return http.get('member/link/delete', { params });
}
export function checkpassword(params: ObjectParams = {}) {
  return http.get('member/password/check', params);
}

export function commissionDraw(data: ObjectParams = {}) {
  return http.post('member/commission/draw', data);
}

export function commissionRation(data: ObjectParams = {}) {
  return http.post('member/commission/ration', data);
}
/**
 * 根据ID获取JSON文件
 */
export function getJsonByID(params: ObjectParams = {}) {
  return http.get('member/tree', { params });
}
/**
 * 场馆钱包列表
 */
export function getPlatWalletList(params: ObjectParams = {}) {
  const path = `${globalConfig.SITE}-json/plat.json`;
  return http.get(getServiceUrl(path), { params });
}

export function getVIPList() {
  const path = `${globalConfig.SITE}-json/VIP.json`;
  return http.get(getServiceUrl(path));
}
export function getVIPRebate() {
  const path = `${globalConfig.SITE}-json/VIPREBATE.json`;
  return http.get(getServiceUrl(path));
}

export function getTransactionType() {
  const path = `${globalConfig.SITE}-json/T019.json`;

  return http.get(getServiceUrl(path));
}

export function getTunnel() {
  const path = `${globalConfig.SITE}-json/tunnel.json`;
  return http.get(getServiceUrl(path));
}

export function manualyPay(params: ObjectParams = {}) {
  return http.post('finance/manual/pay', params);
}

export function manualyBankList(params: ObjectParams = {}) {
  return http.post('finance/bankcard/list', params);
}

export function getPromotionTabList() {
  const path = `${globalConfig.SITE}-json/T008.json`;
  return http.get(getServiceUrl(path));
}
export function getPromotionList(params: ObjectParams = {}) {
  return http.get('promo/list', { params });
}

export function getFirstPromotion(params: ObjectParams = {}) {
  return http.post('promo/firstdepositapply', params);
}
export function getDepositInfo(params: ObjectParams = {}) {
  return http.get('promo/depositinfo', { params });
}
export function getValidBet(params: ObjectParams = {}) {
  return http.get('promo/validbet', { params });
}
export function giftExchange(params: ObjectParams = {}) {
  return http.post('promo/giftexchange', params);
}
export function giftExchangeBet(params: ObjectParams = {}) {
  return http.post('promo/giftexchange/bet', params);
}
export function giftUpdate(params: ObjectParams = {}) {
  return http.post('promo/giftupdate', params);
}
export function giftList(params: ObjectParams = {}) {
  return http.post('promo/giftlist', params);
}
export function reveal(params: ObjectParams = {}) {
  return http.post('promo/reveal', params);
}
export function invitelist(params: ObjectParams = {}) {
  return http.post('promo/invitelist', params);
}
export function getPromoPlatList() {
  return http.get('promo/plat/list');
}
export function getPromoPlatTransfer(params: ObjectParams = {}) {
  return http.get('promo/plat/transfer', { params });
}
export function getMemeberVips() {
  return http.get('member/vips');
}
/**
 * 场馆钱包 根据场馆ID获取余额
 */
export function getBalanceByVenueId(params: ObjectParams = {}) {
  const { id } = params;
  return http.get(`plat/balance/${id}`, { params });
}

/* 一键回收功能 */
export function transferout(params: ObjectParams = {}) {
  return http.get('game/transferout', { params });
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
export function transfer(data: ObjectParams = {}) {
  return http.post('plat/transfer', data);
}

/**
 * 获取OB电子游戏列表
 */
export function getOBdzData() {
  return http.get('data/obdz_web.json');
}

/**
 * 获取PG电子游戏列表数据
 */
export function getPGdzData() {
  return http.get('data/pgdz_web.json');
}

export function getFinaceCate(data: ObjectParams = {}) {
  return http.get('finance/cate', { params: data });
}
export function getFinaceUsdtRate(data: ObjectParams = {}) {
  return http.get('finance/usdt/rate', { params: data });
}
export function getFinaceUsdtTrc(data: ObjectParams = {}) {
  return http.get('finance/usdt/info', { params: data });
}
export function getFinaceTunnel(data: ObjectParams = {}) {
  return http.get('finance/tunnel', { params: data });
}
export function usdtPay(data: ObjectParams = {}) {
  return http.post('finance/usdt/pay', data);
}
export function FinacePay(data: ObjectParams = {}) {
  return http.post('finance/pay', data);
}
export function FinaceManualPay(data: ObjectParams = {}) {
  return http.post('finance/manual/pay', data);
}
export function userLoginOut() {
  return http.get('merchant/admin/logout');
}

export function gamesearch(data: ObjectParams = {}) {
  return http.post('member/slot/search', data);
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
//  天天签到
export function getSignInfo() {
  return http.get('promo/sign/info');
}

export function postSign(data: ObjectParams = {}) {
  return http.post('promo/sign', data);
}

export function postResign(data: ObjectParams = {}) {
  return http.post('promo/resign', data);
}

export function getSignList(data: ObjectParams = {}) {
  return http.get('promo/sign/list', { params: data });
}

export function getSignReceive() {
  return http.get('promo/sign/receive');
}
export function getFloating() {
  return http.get('promo/floating');
}
export function getThirdAgency(data: ObjectParams = {}) {
  return http.get('member/agency', { params: data });
}

export function getAgentReport(data = {}) {
  return http.post('member/agency/report', data);
}

// 修改密码
export function setPassword(data = {}) {
  return http.post('member/updatepassword', data);
}

//
export function getCodeForForgot(data = {}) {
  // return http.post('sms/mobile/verify', data);
  return http.post('sms/online', data);
}

export function setPasswordByForgot(data = {}) {
  return http.post('member/password/forget', data);
}

// 活动详情
export function getPromotionDetail(params: ObjectParams = {}) {
  return http.get('promo/detail', { params });
}

// 设置头像
export function setAvator(params = {}) {
  return http.get('member/avatar/update', { params });
}

// 活动申请
export function getPromotionApply(data: any) {
  return http.post('promo/apply', data);
}

// 活动 救援金 查询前日输赢
export function getPromotionProfit(params: ObjectParams = {}) {
  return http.get('promo/rescue/profit', { params });
}

// VIP活动数据
export function getVipInfo(params = {}) {
  return http.get('member/vip/config');
}

// 发送邮箱验证吗
export function getEmailVerificationCode(data = {}) {
  return http.post('mail/online', data);
}

// 所有下级交易记录
export function gtAgencyRecordTrade(params: ObjectParams = {}) {
  return http.get('member/agency/record/trade', { params });
}

// 下级报表列表
export function gtAgencyReportList(params: ObjectParams = {}) {
  return http.get('member/agency/report/list', { params });
}

// 代理报表下级明细
export function gtAgencyRecordSub(params: ObjectParams = {}) {
  return http.get('member/agency/report/sub', { params });
}

// 下级明细场馆输赢
export function gtAgencyReportSubPlat(params: ObjectParams = {}) {
  return http.get('member/agency/report/sub/plat', { params });
}

// 下级明细场馆余额
export function gtAgencyReportSubBalance(params: ObjectParams = {}) {
  return http.get('member/agency/report/sub/balance', { params });
}

// 投注记录
export function gtAgencyRecordGame(params: ObjectParams = {}) {
  return http.get('member/agency/record/game', { params });
}

// 新手教程是否读取过
export function getTutorialState(params: ObjectParams = {}) {
  return http.get('member/tutorial/state', { params });
}

// 新手教程读取完成
export function setTutorialRead(params: ObjectParams = {}) {
  return http.get('member/tutorial/read', { params });
}

// p3支付详情
export function getP3PayDetail(data = {}) {
  return http.post('finance/qrDetail', data);
}

// 返水日志
export function getRebateList(params: ObjectParams = {}) {
  return http.get('member/rebate/list', { params })
}
// 会员代理福利列表
export function getVipConfigList(params: any) {
  return http.get('member/vip/config', { params });
}

export function monitorErrorInsert(data: {
  api_path?: string;
  error_title: string;
  error_type: 1 | 2 | 3 | 4;
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
  const obj = { view_path: pathname, project: 'p3-h5', browser_version, bower_type, os_version, os_type: os, device: 25, device_type: bower_type + browser_version, ...data };
  console.log('🚀 ~ file: APIs.ts ~ line 484 ~ obj', obj);
  const params = getData(obj);
  const d = encrypt(params, '2085999535');
  return logAxiosInstance.post('log/td/http/record/insert', d, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 获取app下载地址
export const getAppDownloadUrl = (dv: number) => http.get('member/app/upgrade', { params: { dv } })

// 投注活动-查询前日是否有满足要求的投注
export const checkPromoCGcpbet = () => http.get('promo/cgcpbet');

// 更换手机号
export const updateMemberPhone = (data = {}) => http.post('member/bindphone', data)

// 最强大脑活动申请状态
export const checkExamApplyStatus = (params: ObjectParams = {}) => {
  return http.get('promo/exam/apply/status', { params });
}

// 最强大脑回答问题
export const getPromoExam = (data = {}) => http.post('promo/exam', data)

// 获取下一道题
export const getPromoExamNext = (data = {}) => http.post('promo/exam/next', data)

const APIs: { [prop: string]: any } = {
  getAppDownloadUrl,
  register,
  getImgCode,
  mobileReg,
  mobileVoice,
  login,
  getVenueData,
  getEgameData,
  getBankList,
  launchVenue,
  launch2,
  launch3: launch2,
  getPlatWalletList,
  getBalanceByVenueId,
  transfer,
  getOBdzData,
  getPGdzData,
  getFinaceCate,
  getFinaceUsdtRate,
  getFinaceUsdtTrc,
  usdtPay,
  getFinaceTunnel,
  FinacePay,
  ...user,
  ...member,
  transferout,
  getVIPList,
  userLoginOut,
  getTransactionType,
  ...message,
  getVIPRebate,
  gamesearch,
  getTunnel,
  manualyPay,
  manualyBankList,
  getPromotionTabList,
  getPromotionList,
  getPromotionDetail,
  getFirstPromotion,
  getDepositInfo,
  giftExchange,
  giftUpdate,
  giftList,
  reveal,
  invitelist,
  getPopularevents,
  getMemeberVips,
  getJsonByID,
  getServerTime,
  postResign,
  postSign,
  getSignInfo,
  getSignList,
  getSignReceive,
  getFloating,
  getValidBet,
  giftExchangeBet,
  getPromoPlatList,
  getPromoPlatTransfer,
  getThirdAgency,
  memberList,
  addMember,
  updateMember,
  linkList,
  rebateScale,
  addLink,
  deleteLink,
  checkpassword,
  commissionDraw,
  commissionRation,
  memeberInfo,
  getAgentReport,
  getCodeForForgot,
  setPasswordByForgot,
  FinaceManualPay,
  setAvator,
  getPromotionApply,
  getPromotionProfit,
  getVipInfo,
  getEmailVerificationCode,
  gtAgencyRecordTrade,
  gtAgencyReportList,
  gtAgencyRecordSub,
  gtAgencyRecordGame,
  getTutorialState,
  setTutorialRead,
  getBanner,
  getP3PayDetail,
  getRebateList,
  checkPromoCGcpbet,
  getFirAppDetail,
  updateMemberPhone,
  gtAgencyReportSubPlat,
  gtAgencyReportSubBalance,
  checkExamApplyStatus,
  getPromoExam,
  getPromoExamNext,
  checkPlatformMaintain,
  getVipConfigList
};

// @ts-ignore
export default APIs;
