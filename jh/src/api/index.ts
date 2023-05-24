import type { L } from './type.d'
import request from '~/utils/http'

export const getTime = () => new Date().toLocaleString()

// 登录
export const loginRequest = (data: {
  username: string
  password: string
  device_no?: string
  vid?: string
  code?: string
}) => request<string>({ url: '/member/login', method: 'post', data })

// 注册
export const registerRequest = (data: {
  username: string
  password: string
  phone: string
  verify_code: string
  code?: string // 邀请码
  reg_url?: string // 注册链接
  device_no?: string // 设备号
  link_id?: string // 邀请链接id，官网注册没这个参数
  sid: string // 验证码id
  ts: string // 验证码ts
}) => request<string>({ url: '/member/reg', method: 'post', data })

// 注册是否需要验证码
export const memberRiskSmsRequest = () => request<string>({ url: '/member/risk/sms', method: 'get', noToast: true })

// 注册是否需要邀请码
export const memberCodeRequest = () => request<string>({ url: '/member/needcode', method: 'get', noToast: true })
// 检查会员账号是否重复
export const checkMemberUsernameRequest = (username: string) => request({ url: '/member/available', params: { username }, noToast: true })

// 忘记密码
export const forgetpasswordRequest = (data: {
  username: string
  password: string
  ty: '1' | '2' // 1 手机号找回 2 安全密码找回
  phone?: string // 手机号
  withdraw_pwd?: string // 安全密码
}) => request<string>({ url: '/member/password/forget', method: 'post', data })

// 发送离线短信验证码
export const smsOfflineRequest = (data: {
  username: string
  tel: string
  flag: string // text=普通验证码 voice=语音验证码
  ty: 1 | 2 // 1=注册 2=忘记密码
}) => request<string>({ url: '/sms/offline', method: 'post', data })

// 检查手机号是否该账号的
export const memberCheckPhoneRequest = (data: {
  username: string
  phone: string
}) => request<string>({ url: '/member/check/phone', method: 'post', data })

// 检查账号安全密码
export const memberCheckWithdrawpwdRequest = (data: {
  username: string
  password: string // 安全密码
}) => request<string>({ url: '/member/check/withdrawpwd', method: 'post', data })

// 会员信息
export const memberInfoRequest = (params = {}) => request<string>({ url: '/member/token', method: 'get', params })

// 获取特殊信息，比如手机号，真实姓名等
export const memberSensitiveInfoRequest = (params = {}) => request<string>({ url: '/member/info', method: 'get', params })

// 场馆列表 钱包列表
export const memberPlatformRequest = () => request<string>({ url: '/member/platform', method: 'get', noToast: true })

// 场馆钱包余额
export const platBalanceRequest = (params: {
  pid: string
}) => request<string>({ url: `/plat/balance/${params.pid}`, method: 'get', noToast: true })

// 会员余额信息
export const memberBalanceRequest = (params = {}) => request<string>({ url: '/member/balance', method: 'get', params })

// 场馆转账
export const transferRequest = (data: {
  pid: string // 场馆id
  ty: 1 | 2 // 1=转入 2=转出
  amount?: Number // 金额（输入金额，转入转出指定金额，不输入转入转出全部）
}) => request<any>({ url: '/plat/transfer', method: 'post', data })

// 导航栏列表
export const getNavRequest = () => request<Array<{
  id: number
  level: string
  name: string
  sort: number
  prefix: string
  l: L[]
}>>({ url: '/member/nav' })

// 获取 电子 捕鱼 游戏列表
export const getGameListRequest = (params: {
  pid: string
  flag: 0
  page: number
  page_size: number
}) => request<any>({ url: '/member/slot/list', params })

// 获取场馆启动Url
export const getLaunchPlatUrlRequest = (params: {
  id: string
  code?: string
}) => {
  return request<string>({ url: `/plat/launch/${params.id}`, params })
}

// 获取支付方式列表
export const getPayTypesRequest = () => request<Array<[string, string]>>({ url: '/finance/method' })

// 获取渠道信息
export const getChannelsRequest = (id: string) => request<Array<{
  id: string
  flags: number
  customerState: number
  name: string
  min: number
  max: number
  amount_list: string
  note: string
}>>({ url: '/finance/channel', method: 'get', params: { id } })

//  微信 支付宝 数字货币充值
export const financePayRequest = (data: {
  amount: string
  id: string
  currency_id?: string
  rate?: string
}) => request<string>({ url: '/finance/pay', method: 'post', data })

// 银行卡充值
export const financePayOfflineRequest = (data: {
  amount: string
  id: string
  name: string
}) => request<{
  accountName: string
  bankCardNo: string
  bankName: string
  id: string
  msg: string
  ts: string
}>({ url: '/finance/pay/offline', method: 'post', data })

// 添加银行卡
export const insertBankRequest = (data: {
  password: string
  bank_id: number
  bankcard_no: string
  bank_addr?: string
  realname?: string
}) => request<any>({ url: '/member/bankcard/insert', method: 'post', data })

// 获取开户行列表
export const getBankListRequest = () => request<Array<{
  id: number
  level: string
  name: string
  sort: number
  prefix: string
}>>({ url: '/member/tree', params: { id: '010' } })

// 获取我的银行卡列表
export const getMyBankListRequest = () => request<Array<{
  id: string
  uid: string
  username: string
  bank_address: string
  bank_id: string
  bank_branch_name: string
  state: number
  bank_card_hash: string
  created_at: string
  realname: string
  bank_card: string
}>>({ url: '/member/bankcard/list' })

// 新增数字货币地址
export const insertDigitalAddressRequest = (data: {
  wallet_alias: string // 别名
  wallet_agreements: string // 协议方式 TRC-20  ERC-20  MINO
  wallet_address: string // 钱包地址
  currency: string // 币种 usdt
  password: string // 安全密码
}) => request<any>({ url: '/member/wallet/insert', method: 'post', data })

// 获取数字货币列表
export const getDigitalListRequest = () => request<Array<{}>>({ url: '/member/wallet/list' })

// 获取银行卡充值信息
export const getPayBankRequest = (id: string) => request<{
  id: string
  bankName: string
  bankCardNo: string
  accountName: string
  min: number
  max: number
  content_web: string
}>({ url: `/finance/bankcard?id=${id}`, noToast: true })

// 获取数字货币充值信息
export const getFinanceOfflineUsdtRequest = (id: string) => request<{
  addr: string
  dayTotal: string
  factoryId: string
  id: string
  max: number
  min: number
  qr_url: string
}>({ url: `/finance/offline/usdt?id=${id}` })

// 银行卡/数字货币提现
export const financeWithdrawRequest = (data: {
  bid: string // 用户银行卡id 或者 用户数字货币id
  ty: string // '1' 银行卡提现 '2' 数字货币提现
  amount: string // 提现金额
  password: string // 安全密码
  rate?: string // 汇率
}) => request<any>({ url: '/finance/withdraw', method: 'post', data })

// 获取提现汇率（USDT）
export const financeWithdrawRateRequest = () => request<string>({ url: '/finance/withdraw/rate', method: 'get' })

// 站内信-列表
export const memberMsgListRequest = (params: {
  page: number
  page_size: number
  ty: 0 | 1 | 2 // 0 全部 1 站内消息 2 活动消息
  is_read?: 0 | 1 // 0 未读 1已读
}) => request<string>({ url: '/member/message/list', method: 'get', params })

// 站内信-读取
export const memberMsgReadRequest = (data: {
  ts: string
}) => request<string>({ url: '/member/message/read', method: 'post', data })

// 站内信-删除
export const memberMsgDelRequest = (data: {
  flag: 1 | 2 // 1 精确删除 2 删除所有已读
  tss?: string // 站内信ts多个用逗号分隔 当flag = 1时必填
}) => request<string>({ url: '/member/message/delete', method: 'post', data })

// 站内信-未读数
export const memberMsgNumRequest = (params = {}) => request<string>({ url: '/member/message/num', method: 'get', params })

// 活动列表
export const promoListRequest = (params = {}) => request<string>({ url: '/promo/list', method: 'get', params })

// 场馆列表
export const platformListRequest = (params = {}) => request<string>({ url: '/member/platform', method: 'get', params })

// 获取会员返水比例
export const memberRebateScaleRequest = (params = {}) => request<string>({ url: '/member/rebate/scale', method: 'get', params })

// 提现列表信息
export const withdrawInfoRequest = (params = {}) => request<string>({ url: '/finance/withdraw/info', method: 'get', params })
// 首页滚动公告
export const noticesRequest = (params: {
  page: number
  page_size: number
}) => request<string>({ url: '/member/notices', method: 'get', params })
// 设置头像
export const setAvatorRequest = (params: {
  id: number
}) => request<string>({ url: '/member/avatar/update', method: 'get', params })
// 绑定电子邮箱
export const bindEmailRequest = (data: {
  email: string
}) => request<string>({ url: '/member/bindemail', method: 'post', data })
// /member/bindqq
export const bindqqRequest = (data: {
  qq: string
}) => request<string>({ url: '/member/bindqq', method: 'post', data })
// 绑定地址
export const bindAddressRequest = (data: {
  realname?: string
  address?: string
  qq?: string
  email?: string
  birth?: string
}) => request<string>({ url: '/member/update', method: 'post', data })
// 修改密码
export const updataPasswordRequest = (data: {
  old: string
  password: string
  ty: number
}) => request<string>({ url: '/member/password/update', method: 'post', data })
// 找回安全密码
/// member/password/reset
export const resetSafePasswordRequest = (data: {
  phone: string
  password: string
}) => request<string>({ url: '/member/password/reset', method: 'post', data })

// 绑定微信/member/bindwechat
export const bindWechatRequest = (data: {
  wechat: string
}) => request<string>({ url: '/member/bindwechat', method: 'post', data })

// 下级报表列表
export const downReportRequest = (params: {
  page: number
  page_size: number
  ty: string // 1今天2昨天3本月4上月5三天6七天
  is_online?: string // 0全部1在线2离线
  player_name?: string // 搜索的下级
  parent_name?: string // 搜索的上级

}) => request<string>({ url: '/member/agency/report/list', method: 'get', params })

// 代理报表 / 我的盈利
export const myProfitRequest = (data: {
  flags: string // 1代理报表2我的盈利
  ty: string // 1今天 2昨天 3本月 4上月 5三天 6七天
  username?: string
}) => request<string>({ url: '/member/agency/report', method: 'post', data })

// 代理报表四个 下级明细
export const memberAgencyReportSubRequest = (params: {
  ty: string // 1今天2昨天3本月4上月5三天6七天
  flag: string // 1投注人数 2注册人数 3首充人数 4下级人数
  username: string
  page: number
  page_size: number
}) => request<string>({ url: '/member/agency/report/sub', method: 'get', params })

// 代理报表四个 下拉场馆统计
export const memberAgencyReportPlatformRequest = (params: {
  ty: string // 1今天2昨天3本月4上月5三天6七天
  username: string
}) => request<string>({ url: '/member/agency/report/platform', method: 'get', params })

// 下级投注明细
export const getSubordinateBetRequest = (params: {
  page: number
  page_size: number
  date_flag: string // 1今天2昨天3本月4上月5三天6七天7本周8上周
  flag: string // 0全部1已中奖2未中奖3待开奖
  player_name?: string
}) => request<string>({ url: '/member/agency/record/game/list', method: 'get', params })

// 交易记录账变类型
export const getTradeRequestRequest = (params: {
  date_flag: string // 1今天2昨天3本月4上月5三天6七天
  flag: number // 账变类型 271 存款 272 取款 273 转账 274 红利 275 返水/佣金 278 调整
  page: number
  page_size: number
}) => request<string>({ url: '/member/record/trade', method: 'get', params })

// 获取游戏投注记录
export const getRecordRequest = (params: {
  platform_id: number
  date_flag: string
  flag: number // -1 全部 0:下注确认(未结算) 1:结算 2:会员撤单3:无效
  page: number
  page_size: number
}) => request<string>({ url: '/member/record/game', method: 'get', params })
// 活动详情
export const promoDetailRequest = (params: {
  id: string
  flag: string
}) => request<string>({ url: '/promo/detail', method: 'get', params })
// 查看活动申请状态
export const promoApplyStatusRequest = (params: {
  id: number
  flag: string
}) => request<string>({ url: '/promo/apply/status', method: 'get', params })

// 活动申请
export const promoApplyRequest = (data: {
  id: string
  flag: string
  lv?: number
  ty?: string
  amount?: number
  bonus_type?: string
}) => request<string>({ url: '/promo/apply', method: 'post', data })

// 救援金-查询前日输赢
export const getRescueProfitRequest = (params = {}) => request<string>({ url: '/promo/rescue/profit', method: 'get', params })

// 会员列表
export const memberListRequest = (params: {
  username?: string
  parent_name?: string
  page: number
  page_size: number
}) => request<string>({ url: '/member/list', method: 'get', params })

// 下级交易明细 // 1投注人数2注册人数3首充人数4下级人数
export const subListRequest = (params: {
  page: number
  page_size: number
  flag?: string // 0全部271充值272提现
  date_flag?: string // 1今天2昨天3本月4上月5三天6七天
  player_name?: string
}) => request<string>({ url: '/member/agency/record/trade', method: 'get', params })

// 获取推广链接列表
export const getMemberLinkListRequest = () => request({ url: '/member/link/list', method: 'get' })

// 删除推广链接
export const deleteMemberLinkRequest = (params: {
  id: string
}) => request({ url: '/member/link/delete', method: 'get', params })

// 添加推广链接
export const createMemberLinkRequest = (data: {
  zr: string
  qp: string
  ty: string
  dj: string
  dz: string
  by: string
  k3: string
  pk10: string
  ssc: string
  luck28: string
  ll5: string
  lhc: string
}) => request({ url: '/member/link/insert', method: 'post', data })

// 获取广告页
export const memberBannerRequest = (params: {
  flags: number
  page: number
  page_size: number
}) => request({ url: '/member/banner', method: 'get', params })
// 站内信-紧急站内信
export const getEmergencyRequest = (params = {}) => request<string>({ url: '/member/message/emergency', method: 'get', params })

// 彩票明细
export const getLotteryBetListRequest = (params: {
  id: number
  ty: number
  page: number
  page_size: number
  day: string
  state?: any
  username: string
}) => request<{
  d: {
    id: string
    uid: string
    username: string
    issue: string
    lott_id: string
    play_id: string
    created_at: number
    updated_at: number
    multiple: string
    bet_times: number
    bet_amount: string
    pay_amount: string
    bonus: string
    balls: string
    win_times: number
    result: string
    tester: string
    top_uid: string
    top_name: string
    model: string
    parent_uid: string
    parent_name: string
    prefix: string
    flags: string
    state: string
    total_issue: number
    done_issue: number
    stop: string
  }[]
  t: number
  s: number
}>({ url: '/cp/bet/list', params })

// 追号明细
export const getFutureBetListRequest = (params: {
  id: number
  ty: number
  page: number
  page_size: number
  day: string
  state?: any
  username: string
}) => request<{
  d: {
    id: string
    uid: string
    username: string
    issue: string
    lott_id: string
    play_id: string
    created_at: number
    updated_at: number
    multiple: string
    bet_times: number
    bet_amount: string
    pay_amount: string
    bonus: string
    balls: string
    win_times: number
    result: string
    tester: string
    top_uid: string
    top_name: string
    model: string
    parent_uid: string
    parent_name: string
    prefix: string
    flags: string
    state: string
    total_issue: number
    done_issue: number
    stop: string
  }[]
  t: number
  s: number
}>({ url: '/cp/bet/future/list', params })

// 普通注单和追号注单的详情
export const getLotteryBetDetailRequest = (params: { id: string }) => request<{
  id: string
  uid: string
  lott_id: number
  lott_name: string
  play_name: string
  fn: string
  username: string
  issue: string
  created_at: number
  updated_at: number
  bet_times: number
  win_times: number
  pay_amount: string
  bet_amount: string
  multiple: number
  bonus: string
  balls: string
  result: string
  done_issue: number
  total_issue: number
  model: number
  stop: number
  state: number
} | {
  id: string
  uid: string
  lott_id: number
  lott_name: string
  play_name: string
  fn: string
  username: string
  issue: string
  created_at: number
  updated_at: number
  bet_times: number
  win_times: number
  pay_amount: string
  bet_amount: string
  multiple: number
  bonus: string
  balls: string
  result: string
  done_issue: number
  total_issue: number
  model: number
  stop: number
  state: number
  f: {
    id: string
    bonus: string
    result: string
    issue: string
    pay_amount: string
    state: number
    times: number
    win_times: number
    updated_at: number
  }[]
}>({ url: '/cp/bet/detail', params })
// 营销代理-返点赔率表
export const getLotteryOdds = (params: { id: string }) => request<{
  name: string
  level: string
  odds: string
}[]>({ url: '/cp/lott/odds', params })

// 获取彩票是否有问题
export const memberCgcpRequest = () => request({ url: '/member/cgcp', method: 'get', params: {} })

// 获取提现的范围值
export const financeWithdrawRangeRequest = (params: {
  t: string
}) => request({ url: '/finance/withdraw/range', method: 'get', params })

// 获取app下载地址
export const getAppDownloadUrl = (dv: number) => request<{
  status: boolean
  data: {
    platform: string
    version: string
    is_force: number
    content: string
    url: string
  }
}>({ url: '/member/app/upgrade', params: { dv } })

// 银行卡充值提现是否需要提示
export const checkFinancePopupState = (data: { id: string }) => request({ url: '/finance/channel/state', method: 'post', data })

// 银行卡充值提现一个月不再提示
export const readFinancePopup = (data: { id: string }) => request({ url: '/finance/channel/read', method: 'post', data })

// 新手引导状态
export const getTutorialState = () => request({ url: '/member/tutorial/state', method: 'get' })

// 读取新手引导
export const readTutorialState = () => request({ url: '/member/tutorial/read', method: 'get' })

