import http from '../core';

export function getMessageList(data = {}) {
  return http.post('member/message/list', data)
}

export function updateMessage(data = {}) {
  return http.post('member/message/update', data)
}

export function getHomeMarquee() {
  return http.get('member/notices')
}

export function getHomeMarqueeold() {
  return http.get('member/message/marquee', {params: {page: 1, page_size: 200}})
}
// 未读消息数
export function getNotReadMessage() {
  return http.get('member/message/num')
}