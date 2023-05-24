import http from '../core';
import { ResponseType } from '../APIs';
/**
 * 获取用户信息
 */
export function getUserInfo() {
  return http.get('member/token');
}

/**
 * 获取用户Info信息
 */
export function getPersonalInfo() {
  return http.get('member/info');
}

/**
 * 获取用户余额（中心钱包）
 */
export function getUserBalance() {
  return http.get('member/balance');
}

/**
 * 存款
 * @param {*} data {
 *  amount
 * }
 */
export function deposit(data: ObjectParams = {}) {
  return http.post('member/deposit', data);
}

export function getMemberInfo() {
  return http.get('member/info');
}

export function getPhoneCode(data: ObjectParams = {}) {
  return http.post('service/sms', data);
}

export function setBindPhone(data: ObjectParams = {}) {
  return http.post('member/bindphone', data);
}

export function sendEmailCode(data: ObjectParams = {}) {
  return http.post('service/mail', data);
}

export function setBildEmail(data: ObjectParams = {}) {
  return http.post('member/bindemail', data);
}

export function setUpdatePassWord(data: ObjectParams = {}) {
  return http.post('member/password/update', data);
}

/**
 * @description 获取交易记录
 * @export
 * @param {{ start_time: string; end_time: string; flag: number; page: number; page_size: number }} data
 * @return {*}
 */
export function getRecordTrans(data: { start_time: string; end_time: string; flag: number; page: number; page_size: number }) {
  return http.get('member/record/trade', { params: data });
}

export function getVirtualList() {
  return http.get('member/virtual/list');
}

export function getVirtualDel(data: ObjectParams = {}) {
  return http.post('member/virtual/delete', data);
}

export function addVirtual(data: ObjectParams = {}) {
  return http.post('member/virtual/insert', data);
}

export function userInfoUpdate(data: ObjectParams = {}) {
  return http.post('member/update', data);
}

export function getBanksList() {
  let id;
  if (globalConfig.SITE === 'vp9') {
    id = '042';
  } else {
    id = '010';
  }
  return http.get('member/tree', { params: { id } }).then(res => {
    if (res.status) {
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve([]);
    }
  });
}

// 银行卡开户地址
export function getBankAddress(data: ObjectParams = {}) {
  return http.get('member/bankcard/address', { params: data });
}

// 游戏场馆列表
export function getPlatJson() {
  return http.get('member/platform') as ResponseType<
    Array<{ id: string; name: string; wallet_id: string; wallet_name: string; game_type: number; maintained: number; flags: number; state: number; seq: number }>
  >;
}

// 场馆余额
export function getBlanceByGameId(data: ObjectParams = {}) {
  return http.get('game/balance', { params: data });
}

// 银行卡列表
export function getBanksCardList(data: ObjectParams = {}) {
  return http.get('member/bankcard/list', { params: data });
}
// 银行卡维护列表
export function getBanksMaintainList(data: ObjectParams = {}) {
  return http.get('member/withdraw/bank/check', { params: data });
}
// 银行卡新增
export function bankCardInsert(data: ObjectParams = {}) {
  return http.post('member/bankcard/insert', data);
}

// 删除银行卡
export function bankCardDelete(data: ObjectParams = {}) {
  return http.get('member/bankcard/delete', { params: data });
}

// 一键回收
export function gameRecover() {
  return http.get('game/recover');
}
/**
 * @description 站内信-列表
 * @export
 * @param {({ page: number; page_size: number;})} params
 * @return {*}
 */
export function noticeMsgList(params: { page: number; page_size: number }) {
  return http.get('member/message/list', {
    params: {
      ...params,
      ty: 0
    }
  }) as ResponseType<{
    d: Array<{
      ts: string;
      message_id: string;
      username: string;
      title: string;
      content: string;
      is_top: number;
      is_vip: number;
      ty: number;
      is_read: number;
      send_name: string;
      send_at: number;
      prefix: string;
    }>;
    s: number;
    t: number;
  }>;
}

// 系统消息
export function getSysNotice(data: { page: number; page_size: number }) {
  return http.get('member/notices', { params: { ...data, ty: 0, is_read: 0 } });
}

// 站内信-删除
export function delReadMessage(data: { flag?: number; ids?: string }) {
  return http.post('member/message/delete', data);
}

// 上报已读信息
export function getMemberMessageRead(data: { ts: string }) {
  return http.post('member/message/read', data);
}

// 会员当日提款剩余次数和额度
export function memberWithdrawLimt() {
  return http.get('finance/withdraw/limit');
}
// 获取处理中的提款订单
export function memberWithdrawProcessing() {
  return http.get('finance/withdraw/processing');
}
// 取款
export function withdraw(params: { bid: number; amount: string; sid: string; ts: string; verify_code: string }) {
  return http.post('finance/withdraw', params) as ResponseType;
}

// 活动列表
export function getActivityList(data: ObjectParams = {}) {
  return http.get('promo/list', { params: data });
}
// 活动详情
export function getActivityDetail(data: ObjectParams = {}) {
  return http.get('promo/detail', { params: data });
}
// 活动申请
export function activityApply(params = {}) {
  return http.post('promo/firstdepositapply', params);
}
// 存展示页浏览记录
export function reveal(params = {}) {
  return http.post('promo/reveal', params);
}
// 首存豪礼活动兑换
export function giftexchange(params = {}) {
  return http.post('promo/giftexchange', params);
}
// 有效豪礼活动兑换
export function giftexchangeBet(params = {}) {
  return http.post('promo/giftexchange/bet', params);
}
// 首存豪礼列表
export function getGiftlist(params = {}) {
  return http.post('promo/giftlist', params);
}
// 豪礼活动会员有效投注金额
export function getValidbet(data: ObjectParams = {}) {
  return http.get('promo/validbet', { params: data });
}
// 首存豪礼地址更新
export function updateAddress(params = {}) {
  return http.post('promo/giftupdate', params);
}
// 礼金明细
export function getInvitelist(params = {}) {
  return http.post('promo/invitelist', params);
}
// 会员充值信息
export function getDepositinfo(data: ObjectParams = {}) {
  return http.get('promo/depositinfo', { params: data });
}

// 天天签到- 首页右下角是否显示签到
// export function showSignin() {
//   return http.get('promo/floating');
// }
// 天天签到-签到
export function sign(params = {}) {
  return http.post('promo/sign', params);
}
// 天天签到-补签
export function resign(params = {}) {
  return http.post('promo/resign', params);
}
// 天天签到- 本周信息
export function signInfo() {
  return http.get('promo/sign/info');
}
// 天天签到- 签到记录
export function signList(data: ObjectParams = {}) {
  return http.get('promo/sign/list', { params: data });
}
// 天天签到- 领取奖励
export function signReceive() {
  return http.get('promo/sign/receive');
}
export default {
  getUserInfo,
  getUserBalance,
  deposit,
  setUpdatePassWord,
  getActivityList,
  getActivityDetail,
  getValidbet,
  activityApply,
  giftexchange,
  giftexchangeBet,
  getPersonalInfo,
  getGiftlist,
  updateAddress,
  getDepositinfo,
  getInvitelist,
  reveal,
  sign,
  resign,
  signInfo,
  signList,
  signReceive
};
