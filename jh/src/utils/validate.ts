import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
// 验证用户名
export function isUserName(value: string) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z]([a-zA-Z0-9]){4,13}$/
  return reg.test(value)
}

// 验证密码
// export function isPassword(value: string) {
//   const reg = /^(?![0-9])(?![0-9]+$)(?![a-z]+$)[0-9a-z]{8,20}$/
//   return reg.test(value)
// }
export function isPassword(value: string) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
  return reg.test(value)
}

// 验证手机号
export function isPhone(value: string) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(value)
}

// 验证手机验证码/安全密码
export function isPhoneVirtualCode(value: string) {
  const reg = /^[0-9]\d{5}$/
  return reg.test(value)
}

// 验证邮箱
export function isEmail(value: string) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/
  return reg.test(value)
}

// 验证银行卡号
export function isBankCard(value: string) {
  const reg = /^[0-9]\d{9,19}$/
  return reg.test(value)
}

// 验证身份证号码
export function isId(value: string) {
  const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(value)
}

// 验证真实姓名
export function isRealName(value: string) {
  const reg = /^[\u4E00-\u9FA5]{2,}[·]?[\u4E00-\u9FA5]{0,27}$/
  return reg.test(value)
}

// 验证数字货币别名
export function isAlias(value: string): boolean {
  return /[a-zA-Z0-9]{1,10}/.test(value)
}

// 验证数字货币地址
export function isVirtualAddress(value: string): boolean {
  return /[a-zA-Z0-9]{1,12}/.test(value)
}

/* 判断平年闰年 y:年份数字，四位 */
function isOrdinaryYear(y: number) {
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0)
    return false

  return true
}

// 验证是否满18岁
export function satisfyEight(bothDate: number) {
  const nowDate = new Date() // 当前时间
  const mouth = nowDate.getMonth() + 1
  let day = nowDate.getDate()
  const year = nowDate.getFullYear() - 18
  if (mouth === 2 && day >= 28)
    day = isOrdinaryYear(year) ? 28 : 29

  const oldDate = new Date(`${year}-${mouth}-${day}`).getTime()
  return !(oldDate < bothDate)
}
/**
 * 判断是否满18岁
 * time:传入dayljs的日期
 */
export function judgmentAge18(time: Dayjs) {
  const year = Number(dayjs().format('YYYY')) - 18
  const month = dayjs().format('M')
  let day = Number(dayjs().format('D'))
  if (month === '2' && day >= 28)
    day = isOrdinaryYear(year) ? 28 : 29

  const oldDate = dayjs(`${year}-${month}-${day}`)
  return !(oldDate < time)
}
// 验证地址
export const isAddress = (strval: string) => {
  const reg = /^[\u4E00-\u9FA5]{1,30}$/
  return reg.test(strval)
}
// 验证QQ
export const isQq = (strval: string) => {
  const reg = /^[1-9][0-9]{4,10}$/
  return reg.test(strval)
}

// 验证微信号
export const isWechat = (strval: string) => {
  const reg = /^[-_a-zA-Z0-9]{5,19}$/
  return reg.test(strval)
}
