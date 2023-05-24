// 背景图
import heone from '~/assets/images/help/heone.png?preset=full'
import hezei from '~/assets/images/help/hezei.png?preset=full'
import heshen from '~/assets/images/help/heshen.png?preset=full'
import hegui from '~/assets/images/help/hegui.png?preset=full'
import helian from '~/assets/images/help/helian.png?preset=full'
const navFirst = [
  // 帮助中心

  {
    label: '帮助指南',
    icon: heone,
    name: 1,
    path: '/help/help-guide',
  },
  {
    label: '游戏问题',
    icon: hezei,
    name: 2,
    path: '/help/game',
  },
  {
    label: '企业事务',
    icon: heshen,
    name: 3,
    path: '/help/corporate',
  },
  {
    label: '联系我们',
    icon: hegui,
    name: 4,
    path: '/help/rules',
  },
]
// 帮助指南二级页
const guideList = [
  // 帮助中心
  {
    label: '注册',
    name: 1,
    path: '/help/help-guide/help-register',
  },
  {
    label: '充值',
    name: 2,
    path: '/help/help-guide/recharge',
  },
  {
    label: '提现',
    name: 3,
    path: '/help/help-guide/withdraw',
  },
  {
    label: '转账',
    name: 4,
    path: '/help/help-guide/transfer',
  },
  {
    label: '优惠申请',
    name: 5,
    path: '/help/help-guide/discount',
  },
  {
    label: '浏览器',
    name: 5,
    path: '/help/help-guide/browser',
  },
  {
    label: '防劫持教程',
    name: 5,
    path: '/help/help-guide/tutorial',
  },
]
// 游戏问题二级页
const gameList = [
  // 游戏问题
  {
    label: '彩票问题',
    name: 1,
    path: '/help/game/lottery',
  },
  {
    label: '游戏类型',
    name: 2,
    path: '/help/game/game-type',
  },
]
// 企业事务二级页
const corporateList = [
  {
    label: '博彩责任',
    name: 1,
    path: '/help/corporate/responsibility',
  },
  {
    label: '关于我们',
    name: 2,
    path: '/help/corporate/about',
  },
  {
    label: '规则条款',
    name: 1,
    path: '/help/corporate/rule',
  },
  {
    label: '隐私保护',
    name: 2,
    path: '/help/corporate/private',
  },
]
// 联系我么
const contactList = [
  {
    label: '联系我们',
    name: 1,
    path: '/help/rules/contact-us',
  },
]
export { navFirst, guideList, gameList, corporateList, contactList }
