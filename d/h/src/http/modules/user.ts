import http from '../core';

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return http.get('member/token');
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

export function checkUserName(params: ObjectParams = {}) {
  return http.get('member/available', { params });
}

export function userLoginOut() {
  return http.get('member/logout');
}
// 消息列表
export function getMessageList(data: ObjectParams = {}) {
  return http.post('member/message/list', data);
}
// 站内信管理(已读,删除)
export function messageDelOrRead(data: ObjectParams = {}) {
  return http.post('member/message/update', data);
}
export default {
  getUserInfo,
  getUserBalance,
  deposit,
  checkUserName
};
