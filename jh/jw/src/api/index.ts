import type { DateFlag, GameType, NavReturnListType } from './type'

// 忘记密码
export const forgetPassword = (data: {
  username: string
  phone: string
  withdraw_pwd: string
  password: string
  ty: 1 | 2
}) => request({ url: '/member/password/forget', method: 'post', data })

// 检查手机号
export const checkMemberPhone = (data: { username: string; phone: string }) => request({ url: '/member/check/phone', method: 'post', data })

// 检查安全密码
export const checkMemberSecure = (data: { username: string; password: string }) => request({
  url: '/member/check/withdrawpwd',
  method: 'post',
  data,
})

// 检查会员账号是否重复
export const checkMemberUsername = (username: string) => request({ url: '/member/available', params: { username }, noToast: true })

// 注册
export const registerApi = (data: { device_no?: string; username: string; code: string; password: string; phone: string; verify_code: string; link_id: string; reg_url: string; sid?: string; ts?: string }) => request<{ a: string }>({ url: '/member/reg', method: 'post', data })

// 登录
export const loginApi = (data: {
  username: string
  password: string
  device_no?: string
  vid?: string
  code?: string
}) => request<string>({ url: '/member/login', method: 'post', data })

// 查询注册是否需要验证码
export const checkRegisterCode = () => request<boolean>({ url: '/member/risk/sms' })

// 查询邀请码是否必填
export const checkNeedInviteCode = () => request<boolean>({ url: '/member/needcode' })

// 发送离线验证码
export const sendOfflineSms = (data: { username: string; tel: string; flag: 'text' | 'voice'; ty: 1 | 2 }) => request<string>({ url: '/sms/offline', method: 'post', data })

// 获取会员信息
export const getUsrInfo = () => request<{
  uid: string
  username: string
  password: string
  birth: string
  birth_hash: string
  realname_hash: string
  email_hash: string
  phone_hash: string
  zalo_hash: string
  prefix: string
  tester: string
  withdraw_pwd: number
  regip: string
  reg_device: string
  reg_url: string
  created_at: number
  last_login_ip: string
  last_login_at: number
  source_id: number
  first_deposit_at: number
  first_deposit_amount: string
  first_bet_at: number
  first_bet_amount: string
  second_deposit_at: number
  second_deposit_amount: string
  top_uid: string
  top_name: string
  parent_uid: string
  parent_name: string
  bankcard_total: number
  last_login_device: string
  last_login_source: number
  remarks: string
  state: number
  level: number
  balance: string
  lock_amount: string
  commission: string
  group_name: string
  agency_type: number
  address: string
  avatar: string
  last_withdraw_at: string
}>({ url: '/member/token' })

// 获取会员资料
export const getMemberInfo = () => request<{
  [text: string]: any
  uid: string
  username: string
  realname_hash: string
  email_hash: string
  phone_hash: string
  qq_hash: string
  wechat_hash: string
  birth_hash: string
  address: string
  created_at: number
  bankcard_total: number
  level: number
  real_name: string
  phone: string
  email: string
  qq: string
  wechat: string
  birth: string
  link_black_list: number
}>({ url: '/member/info' })

// 更新用户信息（真实姓名/收货地址
export const updateMemberInfo = (
  data: {
    qq?: string
    wechat?: string
    email?: string
    realname?: string
    address?: string
    birth?: string | null
  },
) => request({ url: '/member/update', method: 'post', data })

// 修改头像
export const updateAvatar = (params: { id: string }) => request({ url: '/member/avatar/update', params })
// 用户修改密码
export const updatePassword = (data: { old?: string; password?: string; ty: 1 | 2 }) => request({ url: '/member/password/update', method: 'post', data })

// 用户找回安全密码
export const resetSecurePwd = (data: { phone: string; password: string }) => request({ url: '/member/password/reset', method: 'post', data })

// 获取用户余额信息(中心钱包和锁定钱包)
export const getUserBalance = () => request<{ balance: string; lock_amount: string }>({ url: '/member/balance' })

// 首页榜单数据
export const getRankList = () => request<{
  p: Array<{
    name: string
    profit: string
    avatar: string
    level: number
  }>
  type: string
}>({ url: '/member/profit' })

// 赢家榜
export const getWinnerList = () => request<Array<{
  name: string
  type: number
  amount: number
  avatar: number
}>>({ url: '/member/winner' })

// 获取轮播图列表
export const getBannerList = (flags: 1 | 2 | 3 | 4 | 5, device?: number) => request<{
  banner: Array<{
    id: string
    title: string
    url: string
    sort: string
    img: string
    flags: string
    qr: string
  }>
}>({
  url: '/member/banner',
  params: {
    flags,
    device,
  },
})

// 导航栏列表
export const getNav = () => request<NavReturnListType>({ url: '/member/nav' })

// 获取跑马灯公告
export const getNotice = () => request<{
  d: Array<{
    id: string
    title: string
    content: string
    redirect: number
    redirect_url: string
    state: string
    seq: string
    created_at: number
    created_uid: string
    created_name: string
    updated_at: number
    updated_name: string
    prefix: string
  }>
}>({ url: '/member/notices' })

// 场馆列表
export const getPlatform = () => request<Array<{
  id: string
  name: string
  wallet_id: string
  wallet_name: string
  game_type: number
  maintained: number
  flags: number
  state: number
  seq: number
  share_wallet: number
}>>({ url: '/member/platform' })

// 获取场馆钱包余额
export const getVenueWallet = (id: string) => {
  return request<string>({ url: `/plat/balance/${id}`, noToast: true })
}

// 获取 棋牌 电子 捕鱼 游戏列表
export const getGameList = (params: { pid: string; flag: 0 | 1 | 2; page: number; page_size: number }) => request<any>({ url: '/member/slot/list', params })

// 获取支付方式列表
export const getPayTypes = () => request<Array<[string, string]>>({ url: '/finance/method' })

// 获取提现方式列表
export const getWithdrawTypes = () => request<Array<{
  id: string
  name: string
  note: string
}>>({ url: '/finance/withdraw/info' })

// 获取渠道信息
export const getChannels = (id: string) => request<Array<{
  id: string
  flags: number
  customerState: number
  name: string
  min: number
  max: number
  amount_list: string
  rate?: string
  note: string
  factory_id: string
}>>({ url: `/finance/channel?id=${id}` })

// 获取提现最大最小额 gopay:17 okpay:19 usdt:20 银行卡:15
export const getWithdrawMinMax = (params: { t: string }) => request<{
  id: string
  fmin: string
  fmax: string
}>({ url: '/finance/withdraw/range', params })

//  微信 支付宝 数字货币充值
export const financePay = (data: { amount: string; id: string; currency_id?: string; rate?: string }) => request<string>({ url: '/finance/pay', method: 'post', data })

// 获取数字货币支付二维码信息
export const getDigitalQrCode = (id: string) => request<{
  id: string
  addr: string
  factoryId: string
  dayTotal: string
  min: number
  max: number
  qr_url: string
}>({ url: `/finance/offline/usdt?id=${id}` })

// 银行卡充值
export const financePayOffline = (data: { amount: string; id: string; name: string }) => request<{
  accountName: string
  bankCardNo: string
  bankName: string
  id: string
  msg: string
  ts: string
}>({ url: '/finance/pay/offline', method: 'post', data })

// 银行卡/数字货币提现
export const financeWithdraw = (data: {
  bid: string // 用户银行卡id 或者 用户数字货币id
  ty: string // '1' 银行卡提现 '2' 数字货币提现
  amount: string // 提现金额
  password: string // 安全密码
  rate?: string // usdt提现时需要传汇率
}) => request<any>({ url: '/finance/withdraw', method: 'post', data })

// 获取提现汇率（USDT）
export const getUsdtRate = () => request<string>({ url: '/finance/withdraw/rate', method: 'get' })

// 添加银行卡
export const insertBank = (data: { password: string; bank_id: number; bankcard_no: string; bank_addr?: string; realname?: string }) => request<any>({ url: '/member/bankcard/insert', method: 'post', data })

// 电子游戏奖金池
export const getBonusPool = () => request<string>({ url: '/member/slot/bonus' })

// 获取开户行列表
export const getBankList = (id: string) => request<Array<{
  id: number
  level: string
  name: string
  sort: number
  prefix: string
}>>({ url: '/member/tree', params: { id } })

// 获取我的银行卡列表
export const getMyBankList = () => request<Array<{
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
export const insertDigitalAddress = (data: { wallet_alias: string; wallet_agreements: string; wallet_address: string; currency: string; state?: string; password: string }) => request<any>({ url: '/member/wallet/insert', method: 'post', data })

// 获取数字货币列表
export const getDigitalList = () => request<Array<{
  id: string
  uid: string
  username: string
  wallet_address: string
  wallet_agreements: string
  state: number
  wallet_alias: string
  currency: string
  created_at: number
  updated_at: number
  updated_uid: string
  updated_name: string
  prefix: string
}>>({ url: '/member/wallet/list' })

// 获取银行卡充值信息
export const getPayBank = (id: string) => request<{
  id: string
  bankBranch: string
  bankName: string
  bankCardNo: string
  accountName: string
  min: number
  max: number
  content_app: string
  content_web: string
  bank_id: string
}>({ url: `/finance/bankcard?id=${id}` })

// 转账
export const transfer = (data: { pid: string; ty: 1 | 2; amount?: number }) => request<any>({ url: '/plat/transfer', method: 'post', data, noToast: false })

// 下级报表
export const getUnderReport = (params: { player_name?: string; page: number; page_size: number; ty: '1' | '2' | '3' | '4' | '5' | '6'; is_online?: '0' | '1' | '2'; parent_name?: string }) => request<any>({ url: '/member/agency/report/list', params })

// 紧急站内信
export const getEmergency = () => request<{
  content: string
  is_delete: number
  is_read: number
  is_top: number
  is_vip: number
  message_id: string
  send_at: number
  send_name: string
  title: string
  ts: string
  ty: number
}[]>({ url: '/member/message/emergency' })

// 获取站内信未读数量
export const getMemberNum = () => request({ url: '/member/message/num' })

// 站内信-列表
export const getUserMsgList = (params: { page: number; page_size: number; ty: 0 }) => request<{
  t: number
  s: number
  d: {
    ts: string
    message_id: string
    username: string
    title: string
    content: string
    is_top: number
    is_vip: number
    ty: number
    is_read: number
    send_name: string
    send_at: number
    prefix: string
  }[]
}>({ url: '/member/message/list', method: 'get', params, noToast: true })

// 读取站内信
export const readUserMsg = (data: { ts: string }) => request({ url: '/member/message/read', method: 'post', data })

// 删除站内信
export const deleteUserMsg = (data: { flag: 1 | 2; tss?: string }) => request({ url: '/member/message/delete', method: 'post', data })

// 我的盈利/代理报表
export const getMyProfit = (data: { flags: '1' | '2'; username?: string; ty: DateFlag }) => request<{
  bet_amount: number
  deposit: number
  withdraw: number
  bet_mem_count: number
  first_deposit_count: number
  regist_count: number
  mem_count: number
  rebate: number
  team_rebate: number
  net_amount: number
  dividend_amount: number
  balance_total: number
  balance_platform: number
  win_amount: number
  cg_rebate: number
  profit: number
  virtual_deposit: number
  trans_amount: number
}>({ url: '/member/agency/report', method: 'post', data })

// 投注记录
export const getBetRecord = (params: { flag?: '' | '0' | '1' | '2' | '3' | '4'; page: number; page_size: number; platform_id?: string; player_name?: string; ty?: 1 | 0; date_flag: DateFlag }) => request<{
  t: number
  d: Array<{
    id: string
    row_id: string
    bill_no: string
    api_type: number
    api_types: string
    player_name: string
    name: string
    uid: string
    net_amount: number
    bet_time: number
    start_time: number
    resettle: number
    presettle: number
    game_type: string
    bet_amount: number
    valid_bet_amount: number
    rebate_amount: number
    flag: number
    play_type: string
    prefix: string
    result: string
    api_name: string
    api_bill_no: string
    game_name: string
    odds: number
    settle_time: number
    api_bet_time: number
    api_settle_time: number
    parent_uid: string
    parent_name: string
    is_risk: number
    handicap_type: string
    handicap: string
  }>
  agg: {
    id: string
    row_id: string
    bill_no: string
    api_type: number
    api_types: string
    player_name: string
    name: string
    uid: string
    net_amount: number
    bet_time: number
    start_time: number
    resettle: number
    presettle: number
    game_type: string
    bet_amount: number
    valid_bet_amount: number
    rebate_amount: number
    flag: number
    play_type: string
    prefix: string
    result: string
    api_name: string
    api_bill_no: string
    game_name: string
    odds: number
    settle_time: number
    api_bet_time: number
    api_settle_time: number
    parent_uid: string
    parent_name: string
    is_risk: number
    handicap_type: string
    handicap: string
  }
}>({ url: '/member/record/game', params })

// 代理报表  flag: 1投注人数 2注册人数 3首冲人数 4下级人数
export const getAgencySub = (params: { page: number; page_size: number; ty: DateFlag; flag: 1 | 2 | 3 | 4; username: string }) => request<{ bet_mem_count: number }>({ url: '/member/agency/report/sub', params })

// 获取代理报表 金额
export const getReportPlatform = (params: { ty: DateFlag; username: string }) => request<{
  t: number
  d: Array<{
    bet_amount: string
    api_type: string
    net_amount: string
    company_revenue: string
    plat_balance: string
  }>
  s: number
}>({ url: '/member/agency/report/platform', params })

// 交易记录
export const getTradeRecord = (params: { flag: 271 | 272 | 273 | 274 | 275 | 278; page: number; page_size: number; date_flag: '1' | '2' | '3' | '4' | '5' | '6' }) => request<any>({ url: '/member/record/trade', params })

// 投注明细
export const getBetDetail = (params: { flag: '' | '1' | '2' | '3' | '4'; page: number; page_size: number; platform_id: string; player_name?: string; game_type: GameType | ''; date_flag: '1' | '2' | '3' }) => request<any>({ url: '/member/agency/record/game', params })

// 成员报表
export const getMemberList = (params: { page: number; page_size: number; username?: string; parent_name?: string }) => request<any>({ url: '/member/list', params })

// 交易明细
export const getTradeDetail = (params: {
  page: number
  page_size: number
  date_flag: '1' | '2' | '3'
  flag: 271 | 272 | 273 | 274 | 275 | 278
  player_name?: string
  status: string
}) => request<any>({ url: '/member/agency/record/trade', params })

// 获取场馆启动Url
export const getLaunchPlatUrl = (id: string, code?: string) => {
  return request<string>({
    url: `/plat/launch/${id}`,
    params: {
      id, code,
    },
  })
}

// 获取会员返水比例
export const getMemberRebateScale = () => request<{
  uid: string
  parent_uid: string
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
  created_at: number
  prefix: string
}>({ url: '/member/rebate/scale' })

// 获取推广链接列表
export const getMemberLinkList = () => request<{
  id: string
  uid: string
  username: string
  short_url: string
  short_code: string
  prefix: string
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
  created_at: string
  reg_count: number
}[]>({ url: '/member/link/list' })

// 删除推广链接
export const deleteMemberLink = (params: { id: string }) => request({ url: '/member/link/delete', params })

// 添加推广链接
export const createMemberLink = (data: any) => request({ url: '/member/link/insert', method: 'post', data })

// 活动列表
export const getPromotionList = (params = { page: 1, page_size: 10 }) => request<{
  static: {
    list_web: string
    list_h5: string
    title_web: string
    title_h5: string
  }
  id: string
  state: number
  flag: string
}[]>({ url: '/promo/list', params })

// 活动详情
export const getPromotionDetail = (params: { id?: string; flag?: string }) => request<{
  static: {
    list_web: string
    list_h5: string
    title_web: string
    title_h5: string
  }
  rules: {
    lose_amount: number
    bonus_amount: number
    flow_multiple: number
  }[] | {
    low1: {
      deposit_amount: number
      bonus_rate: number
      limit_amount: number
      bonus_amount: number
      flow_multiple: number
      bonus_type: number
    }[]
    high1: {
      deposit_amount: number
      bonus_rate: number
      limit_amount: number
      bonus_amount: number
      flow_multiple: number
      bonus_type: number
    }[]
  }
  config: {
    title: string
    web_content: string[]
    h5_content: string[]
    sort: number
    period: number
    flag: string
    is_manual: number
    show_time: string
    hide_time: string
    activity_time: string
    end_time: string
    platforms: string[]
    bonus_type: number
    start_time: string
    lv: number
  }
}>({ url: '/promo/detail', params })

// 活动申请
export const promotionApply = (
  data: {
    id?: string
    flag?: 'deposit' | 'rescue' | 'static'
    lv?: 1
    rate?: number
    amount?: number
    bonus_type: 1 | 2
    ty?: 'low' | 'high'
  },
) => request({ url: '/promo/apply', method: 'post', data })

// 活动 救援金 查询前日输赢
export const getPromotionProfit = () => request<string>({ url: '/promo/rescue/profit' })
// 活动 首存三送 查询申请状态
export const getApplyStatus = (params: { id?: string; flag?: string }) => request<{
  high1: boolean
  high2: boolean
  high3: boolean
  low1: boolean
  low2: boolean
  low3: boolean
}>({ url: '/promo/apply/status', params })

// 首页彩票
export const getLotteryList = (params: { id: string; limit: string }) => request<{
  id: number
  name: string
  state: number
  sec: number
  priority: number
  hot: number
  d: any[]
  h: {
    ts: number
    issue: string
    res: string
  }[]
}[]>({ url: '/cp/lott/lobby', params })

// 彩票详情接口 --普通的彩票列表
export const getLotteryBetList = (params: any) => request<{
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

// 彩票详情接口 -- 追号列表
export const getFutureBetList = (params: any) => request<{
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
export const getLotteryBetDetail = (params: { id: string }) => request<{
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
  fn: string
}[]>({ url: '/cp/lott/odds', params })

// 彩票进入场馆检查风控标签
export const checkMemberCGCP = () => request<string>({ url: '/member/cgcp' })

// 获取app下载地址
export const getAppDownloadUrl = () => request<{
  platform: string
  version: string
  is_force: number
  content: string
  url: string
}>({ url: '/member/app/upgrade' })

// 银行卡充值提现是否需要提示
export const checkFinancePopupState = (data: { id: string }) => request({ url: '/finance/channel/state', method: 'post', data })

// 银行卡充值提现一个月不再提示
export const readFinancePopup = (data: { id: string }) => request({ url: '/finance/channel/read', method: 'post', data })
