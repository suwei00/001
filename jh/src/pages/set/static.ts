// 背景图
import chp from '~/assets/images/set/chp.png?preset=full'
import clp from '~/assets/images/set/clp.png?preset=full'
import devp from '~/assets/images/set/devp.png?preset=full'

const navFirst = [
  // 帮助中心
  [
    {
      label: '修改密码',
      icon: chp,
      name: 1,
      path: '/set/change-paw',
    },
    {
      label: '设置安全密码',
      icon: clp,
      name: 2,
      path: '/set/safe-paw',
    },
    {
      label: '设备信息',
      icon: devp,
      name: 3,
      path: '/set/device',
    },

  ],
]
export { navFirst }
