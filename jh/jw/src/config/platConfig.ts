import type { PlatConfigType } from '~/store/type'

const platConfig: Array<PlatConfigType> = [
  {
    label: '热门',
    path: '/hot',
    key: 'hot',
    sort: 0,
  },
  {
    label: '彩票',
    path: '/lottery',
    id: 5,
    key: 'lottery',
    sort: 1,
  },
  {
    label: '真人',
    path: '/live',
    id: 2,
    key: 'live',
    sort: 2,

  },
  {
    label: '电子',
    path: '/egame',
    id: 4,
    key: 'egame',
    sort: 5,
  },
  {
    label: '棋牌',
    path: '/chess',
    id: 7,
    key: 'chess',
    sort: 4,
  },
  {
    label: '体育',
    path: '/sport',
    id: 6,
    key: 'sport',
    sort: 3,
  },
  {
    label: '捕鱼',
    path: '/fish',
    id: 3,
    key: 'fish',
    sort: 6,
  },
  {
    label: '电竞',
    path: '/esport',
    id: 8,
    key: 'esport',
    sort: 7,
  },

]

export default platConfig
