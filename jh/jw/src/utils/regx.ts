// 用户名正则表达式,字母开头，5-14位英文字母与数字组成
export const userNameRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z]([a-zA-Z0-9]){4,13}$/
// 密码正则表达式,密码为8-20位英文字母与数字组成
export const passwordRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,20}$/
// 中国手机号正则表达式
export const phoneRegx = /^1[3456789]\d{9}$/
// 验证码，6位数字
export const verifyCodeRegx = /^\d{6}$/
// 邀请码，6-8位数字
export const inviteCodeRegx = /^\d{6,8}$/
// 中文正则表达式
export const chineseRegx = /^[\u4E00-\u9FA5]+$/
// 数字货币地址,最大44位数字大小写英文
export const digitalAddressRegx = /^[0-9a-zA-Z]{1,44}$/
// 真实姓名--中文
export const nameRegx = /^[\u4E00-\u9FA5]{2,}[·]?[\u4E00-\u9FA5]{0,27}$/
// qq号
export const qqRegx = /^[1-9]\d{4,10}$/
// 微信
export const wechatRegx = /[-_a-zA-Z0-9]{6,19}$/
// 邮箱
export const emailRegx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 正整数和两位小数
export const positiveNumberRegx = /^\d+(\.\d{1,2})?$/
