import request from './blue-core';
export type DateFlag = '1' | '2' | '3' | '4' | '5' | '6';

// 登录
export const login = (data: any) => request({ url: 'member/login', method: 'post', data });

// 登出
export const logout = () => request({ url: 'member/logout' });

// 获取支付通道
export const getFinanceCate = () =>
  request<
    {
      id: string;
      name: string;
      sort: number;
      promo_state: string;
      promo_discount: string;
    }[]
  >({ url: 'finance/cate' });

// 获取我的银行卡列表
export const getBanksCardList = () =>
  request<
    Array<{
      id: string;
      uid: string;
      username: string;
      bank_address: string;
      bank_id: string;
      bank_branch_name: string;
      state: number;
      bank_card_hash: string;
      created_at: string;
      realname: string;
      bank_card: string;
    }>
  >({ url: 'member/bankcard/list' });

// 添加银行卡
export const insertBank = (data: any) => request<any>({ url: 'member/bankcard/insert', method: 'post', data });

// 获取开户行列表
export const getMemberTree = (id = '010') =>
  request<
    Array<{
      id: number;
      level: string;
      name: string;
      sort: number;
      prefix: string;
    }>
  >({ url: 'member/tree', params: { id } });

// 银行卡维护列表
export const getBanksMaintainList = (params: { id: string }) => request<{ [text: string]: string }>({ url: 'member/withdraw/bank/check', params });

// 会员当日提款剩余次数和额度
export const memberWithdrawLimt = () => request({ url: 'finance/withdraw/limit' });

// 获取处理中的提款订单
export const memberWithdrawProcessing = () =>
  request<{
    amount: number;
    bid: string;
    created_at: number;
    id: string;
    state: number;
  }>({ url: 'finance/withdraw/processing' });

// 取款
export const withdraw = (data: { bid: string; amount: string; sid?: string; ts?: string; verify_code?: string }) => request({ url: 'finance/withdraw', method: 'post', data });

// 获取短信验证码
export const getPhoneCode = (data: { flag: string; ty: number; tel?: any }) => request({ url: 'sms/online', method: 'post', data });

// 获取场馆数据
export const getVenueData = () =>
  request<
    {
      id: number;
      level: string;
      name: string;
      sort: number;
      prefix: string;
      l: {
        id: string;
        name: string;
        wallet_id: string;
        wallet_name: string;
        game_type: number;
        maintained: number;
        flags: number;
        state: number;
        seq: number;
        share_wallet: number;
      }[];
    }[]
  >({ url: 'member/nav' });

// 获取用户信息
export const getToken = () => request({ url: 'member/token' });

// 获取用户Info信息
export const getMemberInfo = () => request({ url: 'member/info' });

// 获取某个支付通道的渠道信息
export const getFinanceTunnelById = (params: { id: string }) =>
  request<{
    id: string;
    bank: Array<{ bank_id: string; id: string; code: string; sort: number; name: string }>;
    fmin: string;
    fmax: string;
    amount_list: string;
    sort: string;
    payment_name: string;
  }>({ url: 'finance/tunnel', params });
// 获取站内信未读数量
export const getMemberNum = () => request({ url: 'member/message/num' });

// 获取公告未读数量
export const getNoticeNum = () => request({ url: 'member/notices/num' });

// 站内信-列表
export const getUserMsgList = (params: { page: number; page_size: number; ty: 0 }) =>
  request<{
    t: number;
    s: number;
    d: {
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
    }[];
  }>({ url: 'member/message/list', method: 'get', params, noToast: true });

// 读取站内信
export const readUserMsg = (data: { id: string }) => request({ url: 'member/message/read', method: 'post', data });
// 读取公告
export const readNotices = (data: { id: string }) => request({ url: 'member/notices/read', method: 'post', data });

// 删除站内信
export const deleteUserMsg = (data: { flag?: number; ids?: string }) => request({ url: 'member/message/delete', method: 'post', data });

// 获取跑马灯公告
export const getNotice = (params: { page?: number; page_size?: number }) =>
  request<{
    d: Array<{
      id: string;
      title: string;
      content: string;
      redirect: number;
      redirect_url: string;
      state: string;
      seq: string;
      created_at: number;
      created_uid: string;
      created_name: string;
      updated_at: number;
      updated_name: string;
      prefix: string;
    }>;
  }>({ url: 'member/notices', params });

// 充值
export const FinacePay = (data: { amount: number; id: string }) =>
  request<{
    account: string;
    bank_code: string;
    bank_logo: string;
    card_holder: string;
    id: string;
    pay_code: string;
    qr_code: string;
    url: string;
    useLink: string;
  }>({ url: 'finance/pay', method: 'post', data });

// 离线支付生成二维码
export const getOfflinePayQrCode = (data: { bid: string; amount: string; code: string }) => request<{ qr: string }>({ url: '/finance/gen/code', method: 'post', data });

export const FinaceManualPay = (data: { amount: number; id: string; bid: string }) =>
  request<{
    cardNo: string;
    id: string;
    manualRemark: string;
    name: string;
    realname: string;
    ts: string;
  }>({ url: 'finance/manual/pay', method: 'post', data });

// 获取会员返水比例
export const getRabetScale = () => request({ url: 'member/rebate/scale' });

// 推广链接列表
export const getLinkList = () => request({ url: 'member/link/list' });

// 删除推广链接
export const memberLinkDelete = (params: { id: string }) => request({ url: 'member/link/delete', params });

// 添加推广链接
export const memberLinkInsert = (data: any) => request({ url: 'member/link/insert', method: 'post', data });

// 刷新金额
export const refreshBalance = () => request({ url: 'member/balance' });

// 获取场馆根据id
export const getVenueById = (params: { pid: string; page: number; page_size: number; flag: number }) => request({ url: 'member/slot/list', params });

// 投注记录
export const getBetRecord = (params: { flag?: '' | '0' | '1' | '2' | '3' | '4'; page: number; page_size: number; platform_id?: string; player_name?: string; ty?: string; date_flag: DateFlag }) =>
  request<{
    t: number;
    d: Array<{
      id: string;
      row_id: string;
      bill_no: string;
      api_type: number;
      api_types: string;
      player_name: string;
      name: string;
      uid: string;
      net_amount: number;
      bet_time: number;
      start_time: number;
      resettle: number;
      presettle: number;
      game_type: string;
      bet_amount: number;
      valid_bet_amount: number;
      rebate_amount: number;
      flag: number;
      play_type: string;
      prefix: string;
      result: string;
      api_name: string;
      api_bill_no: string;
      game_name: string;
      odds: number;
      settle_time: number;
      api_bet_time: number;
      api_settle_time: number;
      parent_uid: string;
      parent_name: string;
      is_risk: number;
      handicap_type: string;
      handicap: string;
    }>;
    agg: {
      id: string;
      row_id: string;
      bill_no: string;
      api_type: number;
      api_types: string;
      player_name: string;
      name: string;
      uid: string;
      net_amount: number;
      bet_time: number;
      start_time: number;
      resettle: number;
      presettle: number;
      game_type: string;
      bet_amount: number;
      valid_bet_amount: number;
      rebate_amount: number;
      flag: number;
      play_type: string;
      prefix: string;
      result: string;
      api_name: string;
      api_bill_no: string;
      game_name: string;
      odds: number;
      settle_time: number;
      api_bet_time: number;
      api_settle_time: number;
      parent_uid: string;
      parent_name: string;
      is_risk: number;
      handicap_type: string;
      handicap: string;
    };
  }>({ url: '/member/record/game', params });

// 根据场馆ID获取余额
export const getBalanceByVenueId = (id: string) => request<string>({ url: `plat/balance/${id}`, noToast: true });

// 场馆钱包列表
export const getVenueWalletList = () =>
  request<
    {
      id: string;
      name: string;
      wallet_id: string;
      wallet_name: string;
      game_type: number;
      maintained: number;
      maintained_start: number;
      maintained_end: number;
      flags: number;
      state: number;
      seq: number;
      share_wallet: number;
    }[]
  >({ url: 'member/platform' });

// 场馆转入转出 ty 1 转入 ty 2 转出
export const transfer = (data: { pid: string; ty: 1 | 2; amount?: number }) => request<string>({ url: 'plat/transfer', method: 'post', data });
// 一键转出不要Toast
export const transferAll = (data: { pid: string; ty: 1 | 2 }) => request<string>({ url: 'plat/transfer', method: 'post', data, noToast: true });

// 设置假免转
export const setAutomaticTransfer = (params: { state: 1 | 2 }) => request({ url: 'member/automatic/set', params });

// 编辑头像
export const updateAvatar = (params: { id: string }) => request<string>({ url: 'member/avatar/update', method: 'get', params });

// 个人交易记录
export const getTradeRecord = (params: { flag: 271 | 272 | 273 | 276 | 274 | 275 | 278; page: number; page_size: number; date_flag: '1' | '2' | '3' | '4' | '5' | '6' ; ty?: string}) =>
  request<any>({ url: '/member/record/trade', params });

// 下级报表
export const getUnderReport = (params: { player_name?: string; page: number; page_size: number; ty: '1' | '2' | '3' | '4' | '5' | '6'; is_online?: '0' | '1' | '2'; parent_name?: string }) =>
  request<any>({ url: '/member/agency/report/list', params });
// 成员报表
export const getMemberList = (params: { page: number; page_size: number; username?: string; parent_name?: string }) => request<any>({ url: '/member/list', params });

// 投注明细
export const getBetDetail = (params: {
  flag: '-1' | '0' | '1' | '2' | '3' | '4';
  page: number;
  page_size: number;
  platform_id: string;
  player_name?: string;
  game_type: '';
  date_flag: '1' | '2' | '3' | '4' | '7' | '8';
  is_asc: '1' | '0';
  sort_field: string;
  ty?: string;
}) => request<any>({ url: '/member/agency/record/game', params });

// 交易明细
export const getTradeDetail = (params: { page: number; page_size: number; ty?: string; date_flag: '1' | '2' | '3'; flag: 271 | 272 | 273 | 274 | 275 | 278; player_name?: string; status: string }) =>
  request<any>({ url: '/member/agency/record/trade', params });

// 绑定zalo号
export const memberZalo = (data: { zalo: string }) => request<string>({ url: 'member/bindzalo', method: 'post', data });
// 我的盈利/代理报表
export const getMyProfit = (data: { username?: string; ty?: DateFlag, start_time?: string; end_time?: string }) =>
request<{
    bet_amount: number;
    deposit: number;
    withdraw: number;
    bet_mem_count: number;
    first_deposit_count: number;
    regist_count: number;
    mem_count: number;
    rebate: number;
    team_rebate: number;
    net_amount: number;
    dividend_amount: number;
    balance_total: number;
    balance_platform: number;
    win_amount: number;
    cg_rebate: number;
    profit: number;
    virtual_deposit: number;
    trans_amount: number;
  }>({ url: '/member/agency/report', method: 'post', data });

// 在线邮箱验证码
export const mailOnline = (data: { mail: string; ty: string }) => request<string>({ url: 'mail/online', method: 'post', data });

// 绑定邮箱
export const setBildEmail = (data: { email: string; code: string; sid: string; ts: string }) => request<string>({ url: 'member/bindemail', method: 'post', data });

// 手机验证码
export const smsOnlineCode = (data: { flag: string; ty: string; tel?: string }) => request<string>({ url: 'sms/online', method: 'post', data });

// 修改登录密码
export const updateLoginPwd = (data: { old: string; password: string; reset_password: string; sid: string; ts: string; code: string; ty: string }) =>
  request({ url: 'member/password/update', method: 'post', data });

// 代理报表  flag: 5｜6｜7｜8｜1｜3｜2｜4｜9｜10｜11｜null｜13｜14
export const getAgencySub = (params: { page: number; page_size: number; ty: DateFlag; flag: 5 | 6 | 7 | 8 | 1 | 3 | 2 | 4 | 9 | 10 | 11 | 13 | 14; username: string }) =>
  request<{ bet_mem_count: number }>({ url: '/member/agency/report/sub', params });

// 获取banner flags 1
export const getBannerByFlags = (params: { flags: number }) => request({ url: 'member/banner', params });

// 绑定邮寄地址
export const bindAddress = (data: { address: string }) => request({ url: 'member/update', method: 'post', data });

// 保存生日
export const updateBirth = (data: { birth: string }) => request({ url: 'member/update', method: 'post', data });

// 获取会员最高返水比例
export const getRebateScale = () => request({ url: 'member/rebate/scale', method: 'get' });

// 用户名重复
export const checkUsernameAvailable = (params: { username: string }) => request({ url: 'member/available', params, noToast: true });

// 发送验证码
export const sendOfflineSms = (data: { username: string; tel: string; flag: string; ty: 1 | 2 }) => request({ url: 'sms/offline', method: 'post', data });

// 注册账号
export const register = (data: { username: string; password: string; device_no: string; phone: string; verify_code: string; link_id: string; reg_url: string; sid: string; ts: string }) =>
  request({ url: 'member/reg', method: 'post', data });

// 盈利榜
export const getProfit = () => request({ url: 'member/profit' });

// 活动全部列表
export const getPromotionList = () =>
  request<
    Array<{
      flag: string;
      id: string;
      state: number;
      static: {
        list_web: string;
      };
    }>
  >({ url: 'promo/list', params: { tag: 0, page: 1, page_size: 100 } });

// 活动详情
export const getPromotionDetail = (params: { flag: string; id: string }) =>
  request<{
    static: {
      list_web: string;
      list_h5: string;
      title_web: string;
      title_h5: string;
      share_h5: string;
    };
    rules: {
      exam_num: number;
      bonus_amount: number;
      flow_multiple: number;
    }[];
    config: {
      title: string;
      web_content: string[];
      h5_content: string[];
      sort: number;
      period: number;
      flag: string;
      show_time: string;
      deposit_flag: number;
      deposit_amount: number;
      channel_type: string[];
      start_time: string;
      end_time: string;
    };
  }>({ url: 'promo/detail', params });

// 投注活动-查询前日是否有满足要求的投注
export const checkPromoCGcpbet = () => request<string>({ url: 'promo/cgcpbet' });

// 活动申请
export const getPromotionApply = (data: any) => request({ url: 'promo/apply', method: 'post', data });

// 活动 救援金 查询前日输赢
export const getPromotionProfit = () => request<string>({ url: 'promo/rescue/profit' });

// 查看首存活动申请状态
export const getFirAppDetail = (params: { id: string; flag: string }) =>
  request<{
    1: boolean;
    2: boolean;
    3: boolean;
  }>({ url: 'promo/apply/status', params });

// 获取上一次成功提款后的存款详情
export const getPromoDepDetail = () =>
  request<{
    1: string;
    2: string;
    3: string;
  }>({ url: 'promo/deposit/detail' });

// 最强大脑活动申请状态
export const checkExamApplyStatus = (params: { id: string }) =>
  request<{
    state: number;
    apply_status: number;
    deposit: number;
    condition: number;
  }>({ url: 'promo/exam/apply/status', params });

// 最强大脑回答问题
export const getPromoExam = (data: any) =>
  request<{
    total: number;
    state: number;
    true_answer: {
      id: string;
      answer: string;
    };
    error_paring: string;
    apply_status: number;
    bonus: number;
    true_num: number;
    no: number;
  }>({ url: 'promo/exam', method: 'post', data });

// 获取下一道题
export const getPromoExamNext = (data: any) =>
  request<{
    total: number;
    next_ques_id: string;
    next_ques: string;
    next_answer: {
      id: string;
      answer: string;
    }[];
    next_finish_at: number;
    apply_status: number;
    no: number;
    true_num: number;
    bonus: number;
  }>({ url: 'promo/exam/next', method: 'post', data });

// 场馆检查是否维护和定时维护
export const getPlatformCheck = (data: { id: string; rflag?: number }) => request({ url: 'member/platform/check', method: 'post', data });

// 奖池金额
export const getjackpot = () => request({ url: 'member/slot/bonus', method: 'get' });

export const getPlatLaunch = (params: { id: string; code?: string }) => request<string>({ url: `plat/launch/${params.id}`, params });
// 检查手机号
export const checkMemberPhone = (data: { username: string; phone: string }) => request({ url: '/member/check/phone', method: 'post', data });

// 忘记密码
export const forgetPassword = (data: { username: string; phone: string; password: string; code: string; sid: string; ts: string }) => request({ url: '/member/password/forget', method: 'post', data });

// 在线人数
export const getOnlineCount = () => request({ url: 'member/online/count' });

// 今日派奖
export const getAwardCount = () => request({ url: '/member/award' });

// 跑马灯
export const getMarqueeCount = () => request({ url: '/member/marquee' });
// 下级明细场馆输赢
export const getReportSubPlat = (params: { username?: string; ty?: string }) => request<any>({ url: '/member/agency/report/sub/plat', params });
// 下级明细场馆余额
export const getAgencyReportSubBalance = (params: { username?: string; ty?: string }) => request<any>({ url: '/member/agency/report/sub/balance', params });

// 获取公告弹窗
export const getMemBanner = (params: { flags: number }) => request({ url: '/member/banner/web', params });

// 公告已读
export const readMemBanner = (data: { id: string }) => request({ url: '/member/banner/read', data, method: 'post' });

// 绑定手机
export const setBindPhone = (data: { phone: string; verify_code: string; sid: string; ts: string }) => request({ url: '/member/bindphone', data, method: 'post' });

// 获取紧急站内信
export const getEmergency = () => request({ url: 'member/message/emergency' });

// 流水详情
export const getFlowDetail = (params: { page?: number; page_size?: number }) => request<any>({ url: 'promo/flow/detail', params });

// 是否开启邀请码
export const getNeedcode = () => request<any>({ url: 'member/needcode' });

// 获取交易报表的充值方式选项
export const getTradeChannel = () => request<any>({ url: '/member/record/trade/channel' });

const APIs = {
  login,
  logout,
  getFinanceCate,
  getVenueData,
  getToken,
  getFinanceTunnelById,
  FinacePay,
  getRabetScale,
  getLinkList,
  memberLinkDelete,
  memberLinkInsert,
  getMemberInfo,
  FinaceManualPay,
  getBetRecord,
  refreshBalance,
  getBalanceByVenueId,
  getVenueWalletList,
  transfer,
  transferAll,
  getVenueById,
  getTradeRecord,
  getBanksCardList,
  getBanksMaintainList,
  memberWithdrawLimt,
  memberWithdrawProcessing,
  withdraw,
  getMemberTree,
  getUnderReport,
  updateAvatar,
  getMemberList,
  getBetDetail,
  getTradeDetail,
  memberZalo,
  getNotice,
  getMyProfit,
  getAgencySub,
  getPhoneCode,
  getBannerByFlags,
  getRebateScale,
  updateBirth,
  bindAddress,
  updateLoginPwd,
  smsOnlineCode,
  setBildEmail,
  mailOnline,
  checkUsernameAvailable,
  sendOfflineSms,
  register,
  getPromotionList,
  getPromotionDetail,
  checkPromoCGcpbet,
  getPromotionApply,
  getPromotionProfit,
  getFirAppDetail,
  getPromoDepDetail,
  checkExamApplyStatus,
  getPromoExam,
  getPromoExamNext,
  getPlatformCheck,
  getMemberNum,
  getPlatLaunch,
  setAutomaticTransfer,
  getOfflinePayQrCode,
  checkMemberPhone,
  forgetPassword,
  getProfit,
  getOnlineCount,
  getAwardCount,
  getMarqueeCount,
  getReportSubPlat,
  getAgencyReportSubBalance,
  getMemBanner,
  readMemBanner,
  setBindPhone,
  getEmergency,
  readUserMsg,
  readNotices,
  getNoticeNum,
  getFlowDetail,
  getNeedcode,
  getTradeChannel,
};
export default APIs;
