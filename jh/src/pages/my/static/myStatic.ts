// 背景图
import bgSrc1 from '~/assets/images/my/recharge.png?preset=full'
import bgSrc2 from '~/assets/images/my/transfer.png?preset=full'
import bgSrc3 from '~/assets/images/my/withdraw.png?preset=full'

import bgSrc4 from '~/assets/images/my/wallet.png?preset=full'
import bgSrc5 from '~/assets/images/my/betRecord.png?preset=full'
import bgSrc7 from '~/assets/images/my/accountManage.png?preset=full'

import bgSrc8 from '~/assets/images/my/myList/proxyReport.png?preset=full'
import bgSrc9 from '~/assets/images/my/myList/downReport.png?preset=full'
import bgSrc10 from '~/assets/images/my/myList/memberManage.png?preset=full'
import bgSrc11 from '~/assets/images/my/myList/betDetails.png?preset=full'
import bgSrc12 from '~/assets/images/my/myList/tradeDetails.png?preset=full'
import bgSrc13 from '~/assets/images/my/myList/marketActing.png?preset=full'
import bgSrc14 from '~/assets/images/my/myList/myProfit.png?preset=full'
import bgSrc15 from '~/assets/images/my/myList/rebateRatio.png?preset=full'
import bgSrc16 from '~/assets/images/my/myList/helpGuide.png?preset=full'
import bgSrc17 from '~/assets/images/my/myList/downloadAPP.png?preset=full'
import bgSrc18 from '~/assets/images/my/myList/lottery.png?preset=full'
import bgSrc20 from '~/assets/images/my/myList/balanceIcon.png?preset=full'
import bgSrc19 from '~/assets/images/my/lottery.png?preset=full'

const financeList = [
  {
    icon: bgSrc1,
    label: '充值',
    path: '/my/recharge',
  },
  {
    icon: bgSrc2,
    label: '转账',
    path: '/my/transfers',
  },
  {
    icon: bgSrc3,
    label: '提现',
    path: '/my/withdraw',
  },
]

const userList = [
  {
    icon: bgSrc4,
    label: '我的钱包',
    path: '/my/wallet',
  },
  {
    icon: bgSrc19,
    label: '彩票记录',
    path: '/my/lottery-record/1',
  },
  {
    icon: bgSrc5,
    label: '投注记录',
    path: '/my/bet-record',
  },
  {
    icon: bgSrc7,
    label: '账户管理',
    path: '/my/account-manage',
  },

]

const agencyList = [
  [
    {
      icon: bgSrc20,
      label: '余额宝',
      path: '/my/balance-yu',
    },
    {
      icon: bgSrc18,
      label: '交易记录',
      path: '/my/trade-record',
    },
    {
      icon: bgSrc14,
      label: '我的盈利',
      path: '/my/my-profit',
    }, {
      icon: bgSrc15,
      label: '返水比例',
      path: '/my/rebate-ratio',
    },

  ],
  [
    {
      icon: bgSrc8,
      label: '代理报表',
      path: '/my/proxy-report',
    },
    {
      icon: bgSrc9,
      label: '下级报表',
      path: '/my/down-report',
    },
    {
      icon: bgSrc10,
      label: '会员管理',
      path: '/my/member-manage',
    },
    {
      icon: bgSrc11,
      label: '投注明细',
      path: '/my/bet-fine',
    },
    {
      icon: bgSrc12,
      label: '交易明细',
      path: '/my/trade-fine',
    },
    {
      icon: bgSrc18,
      label: '彩票明细',
      path: '/my/lottery-fine/1',
    },
    {
      icon: bgSrc13,
      label: '营销代理',
      path: '/my/marketing-acting',
    },
  ],

  [
    {
      icon: bgSrc16,
      label: '帮助指南',
      path: '/help',
    },
    {
      icon: bgSrc17,
      label: '下载APP',
      path: 'download',
    },
  ],
]

export {
  financeList,
  userList,
  agencyList,

}
