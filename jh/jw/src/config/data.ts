export const dateList = [{
  label: '今天',
  value: '1',
}, {
  label: '昨天',
  value: '2',
}, {
  label: '3天',
  value: '5',
}, {
  label: '7天',
  value: '6',
}, {
  label: '本月',
  value: '3',
}, {
  label: '上月',
  value: '4',
}]
// 投注状态
export const betStateList = [
  { label: '全部', value: '' },
  { label: '未结算', value: '0' },
  { label: '已结算', value: '1' },
  { label: '用户撤单', value: '2' },
  { label: '无效', value: '3' },
  // { label: '中奖撤单', value: '4' },
]

// 交易状态 1为成功样式 2为失败样式
export const tradeStateList = [
  {
    label: '成功',
    value: 1,
    type: 1,
  },
  {
    label: '待确认',
    value: 361,
  },
  {
    label: '成功',
    value: 362,
    type: 1,
  },
  {
    label: '存款已取消',
    value: 363,
  },
  {
    label: '待确认',
    value: 364,
  },
  {
    label: '待确认',
    value: 371,
  },
  {
    label: '失败',
    value: 372,
    type: 2,
  },
  {
    label: '待确认',
    value: 373,
  },
  {
    label: '成功',
    value: 374,
    type: 1,
  },
  {
    label: '失败',
    value: 375,
    type: 2,
  },
  {
    label: '提款异常订单',
    value: 376,
    type: 2,
  },
  {
    label: '失败',
    value: 377,
    type: 2,
  },
  {
    label: '失败',
    value: 191,
    type: 2,
  },
  {
    label: '成功',
    value: 192,
    type: 1,
  },
  {
    label: '待确认',
    value: 193,
  },
  {
    label: '待确认',
    value: 194,
  },
  {
    label: '待确认',
    value: 195,
  },
  {
    label: '待确认',
    value: 256,
  },
  {
    label: '成功',
    value: 257,
    type: 1,
  },
  {
    label: '失败',
    value: 258,
    type: 2,
  },
  {
    label: '待确认',
    value: 231,
  },
  {
    label: '成功',
    value: 232,
    type: 1,
  },
  {
    label: '失败',
    value: 233,
    type: 2,
  },
]

// 交易类型
export const tradeTypeList = [
  { label: '充值', value: 271 },
  { label: '提现', value: 272 },
  { label: '转账', value: 273 },
  { label: '红利', value: 274 },
  { label: '返水', value: 275 },
  { label: '返点', value: 276 },
  { label: '调整', value: 278 },
]
// 反水类型
export const rebateTypeList = [
  { label: '真人返水', value: 642 },
  { label: '彩票返水', value: 643 },
  { label: '体育返水', value: 644 },
  { label: '棋牌返水', value: 645 },
  { label: '电竞返水', value: 646 },
  { label: '斗鸡返水', value: 647 },
  { label: '捕鱼返水', value: 648 },
  { label: '电游返水', value: 649 },
  { label: '彩票返水', value: 656 },
  { label: '彩票返水', value: 663 },
  { label: '下级返水', value: 170 },
]

// 彩票详情
// 查询范围
export const rangeList = [
  { label: '自身', value: 1 },
  { label: '直属下级', value: 2 },
]
// 投注时间
export const cpDateList = [
  { label: '今天', value: '0' },
  { label: '昨天', value: '1' },
  { label: '3天', value: '3' },
  { label: '7天', value: '7' },
  { label: '本月', value: '30' },
  { label: '上月', value: '60' },
]
// 投注状态
export const cpBetState = [
  { label: '待开奖', value: '0' },
  { label: '已中奖', value: '1' },
  { label: '未中奖', value: '2' },
  { label: '和', value: '3' },
  { label: '已撤单', value: '4' },
  { label: '中奖撤单', value: '5' },
  { label: '进行中', value: '6' },
  { label: '已结束', value: '7' },
]
// 模式
export const cpModel = [
  { label: '元', value: '1' },
  { label: '角', value: '2' },
  { label: '分', value: '3' },
  { label: '1元', value: '4' },
]
