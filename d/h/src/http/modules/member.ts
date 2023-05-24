/*
 * @Descripttion:
 * @Date: 2021-04-06 14:36:17
 */
import http from '../core';
/**
 * 获取银行卡信息
 *  * @param {*} data {
 */
export function getBankCardList(data: ObjectParams = {}) {
  return http.get('member/bankcard/list', data);
}

// 检查银行是否维护
export function checkBankCardMaintain(params: ObjectParams = {}) {
  return http.get('member/withdraw/bank/check', { params });
}

export function getBankAddress(params: ObjectParams = {}) {
  return http.get('member/bankcard/address', { params });
}
/**
 * 新增银行卡
 * @param {*} data {
 *
 * }
 */
export function addBankCard(data: ObjectParams = {}) {
  return http.post('member/bankcard/insert', data);
}

/**
 * 修改银行卡
 * @param {*} data {
 *
 * }
 */
export function upDateBankCard(data: ObjectParams = {}) {
  return http.post('member/bankcard/update', data);
}

/**
 * 删除银行卡
 * @param {*} data {
 *
 * }
 */
export function deleteBankCard(params: ObjectParams = {}) {
  return http.get('member/bankcard/delete', { params });
}

/**
 * 虚拟币列表
 * @param {*} data {
 *
 * }
 */
export function getVirtualList(params: ObjectParams = {}) {
  return http.get('member/virtual/list', { params });
}

/**
 * 新增虚拟币
 * @param {*} data {
 *
 * }
 */
export function addVirtual(data: ObjectParams = {}) {
  return http.post('member/virtual/insert', data);
}

/**
 * 删除虚拟币
 * @param {*} data {
 *
 * }
 */
export function deleteVirtual(data: ObjectParams = {}) {
  return http.post('member/virtual/delete', data);
}

/**
 * 投注记录
 */
export function getGameRecord(params: ObjectParams = {}) {
  return http.get('member/record/game', { params });
}
/**
 * 交易记录
 */
export function getTransaction(params: ObjectParams = {}) {
  return http.get('member/record/trade', { params });
}

/**
 * 佣金记录
 */
export function getCommissionn(params: ObjectParams = {}) {
  return http.get('member/record/commission', { params });
}
/**
 * ww8交易记录
 */
export function getTransact(params: ObjectParams = {}) {
  return http.get('member/record/transaction', { params });
}
/**
 * 交易详情
 */
export function getTradeDetail(params: ObjectParams = {}) {
  return http.get('member/record/tradedetail', { params });
}
/**
 * 手机验证码
 */
export function sendPhoneCode(data: ObjectParams = {}) {
  return http.post('service/sms', data);
}
/**
 * 绑定手机
 */
export function bindPhone(data: ObjectParams = {}) {
  return http.post('member/bindphone', data);
}
/**
 * 邮箱验证码
 */

// 原来
// export function sendEmailCode(data: ObjectParams = {}) {
//   return http.post('service/mail', data);
// }

// 最新
export function sendEmailCode(data: ObjectParams = {}) {
  return http.post('member/email', data);
}
/**
 * 找回密码
 */
export function findEmail(data: ObjectParams = {}) {
  return http.post('member/email', data);
}

/**
 * 绑定邮箱
 */
export function bindEmail(data: ObjectParams = {}) {
  return http.post('member/bindemail', data);
}

/**
 * 绑定邮箱
 */
export function bindZalo(data: ObjectParams = {}) {
  return http.post('member/bindzalo', data);
}
/**
 * 修改密码
 */
export function updatePassword(data: ObjectParams = {}) {
  return http.post('member/password/update', data);
}
/**
 * 个人资料
 */
export function getInfo(params: ObjectParams = {}) {
  return http.get('member/info', { params });
}

/**
 * 修改个人资料
 */
export function updateInfo(data: ObjectParams = {}) {
  return http.post('member/update', data);
}

/* VIP详情 */
export function getVIPRules() {
  return http.get('member/vip');
}

export function resetPassword(params: ObjectParams = {}) {
  return http.post('member/password/forget', params);
}

export function getPlatList() {
  return http.get('member/platform');
}

// 站内信-列表
export function getMemberMessageList(params: ObjectParams = {}) {
  return http.get('member/message/list', { params });
}

// 站内信-读取
export function getMemberMessageRead(data: ObjectParams = {}) {
  return http.post('member/message/read', data);
}

// 站内信-删除
export function getMemberMessageDelete(data: { flag: number; tss: string }) {
  return http.post('member/message/delete', data);
}

// 站内信-未读数
export function getMemberMessageNum() {
  return http.get('member/message/num');
}

// 站内信-首页紧急站内信弹窗
export function getEmergency() {
  return http.get('member/message/emergency');
}


export function withdraw(params = {}) {
  return http.post('finance/withdraw', params);
}

export function getWithdrawLimit() {
  return http.get('finance/withdraw/limit');
}

// 获取用户处理中的提款订单详情
export function getWithdrawProcessing() {
  return http.get('finance/withdraw/processing');
}

// 获取指定用户返水比例详情
export function getRebateRateFromMember(params = {}) {
  return http.get('member/rebate/detail', { params });
}

export default {
  getBankCardList,
  checkBankCardMaintain,
  getBankAddress,
  addBankCard,
  upDateBankCard,
  deleteBankCard,
  getVirtualList,
  addVirtual,
  deleteVirtual,
  getGameRecord,
  getTransaction,
  getCommissionn,
  getTransact,
  sendPhoneCode,
  bindPhone,
  sendEmailCode,
  findEmail,
  bindEmail,
  updatePassword,
  getInfo,
  updateInfo,
  getVIPRules,
  getTradeDetail,
  resetPassword,
  getPlatList,
  getMemberMessageList,
  getMemberMessageRead,
  getMemberMessageDelete,
  getMemberMessageNum,
  getWithdrawLimit,
  withdraw,
  getWithdrawProcessing,
  getRebateRateFromMember,
  getEmergency
};
