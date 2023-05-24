import type { PlatType } from './type'
import type { L } from '~/api/type'

export const useAppStore = defineStore('app', () => {
  let token = $(useSessionStorage('token', ''))
  // 是否是登录状态
  const isLogged = ref(false)
  const setToken = (t: string) => {
    if (!t)
      return
    token = t
    isLogged.value = true
  }
  const clearToken = () => {
    token = ''
    isLogged.value = false
  }
  // 获取nav列表
  const { data: navRes, run: runGetNav } = $(useRequest(getNav))

  // 顶部nav和默认config生成navList
  const navList = $computed<PlatType[]>(() => {
    if (!navRes?.length)
      return platConfig
    // nav排序
    const sortNav = sortBy(platConfig, 'sort')
    return sortNav.map((config) => {
      const o = navRes?.find(item => item.id === config.id)
      // 场馆游戏排序
      const l = sortBy(o?.l, 'seq')
      // 给游戏路由
      const list = l?.map((item: L, index) => {
        // 电子和捕鱼,需要跳转到游戏列表，并激活tab
        return [3, 4].includes(item.game_type) ? { ...item, path: `${config.path}?type=${index}` } : item
      })
      return o ? { ...config, ...o, l: list } : config
    })
  })
  // TODO:浆糊代码，获取nav移入后的下拉游戏列表(去除hot热门,后端只给了cg彩票的相关信息，前端显示的彩票种类数据是写死的)
  const navGameList = $computed(() => {
    const filterNavList = navList.filter(item => item.key !== 'hot')
    return filterNavList.map((item) => {
      if (!item.l?.length)
        return item
        // 如果是彩票，使用前端的写死的数据
      if (item.key === 'lottery') {
        // 获取彩票的维护状态，然后所有的彩票种类都使用这个状态
        const maintained = item.l![0].maintained
        return {
          ...item,
          l: lottery.map(o => ({ ...o, maintained })),
        }
      }
      const l = item.l!.map((item) => {
        const config = navConfig.find(nav => nav.id === item.id)!
        return {
          ...item,
          ...config,
        }
      })
      return {
        ...item,
        l,
      }
    })
  })
  // 游戏类型，用于投注明细下拉框
  const gameTypeList = $(computed(() => navList.slice(1)))

  // 获取所有游戏
  const games = $computed(() => {
    if (!gameTypeList?.length)
      return []
    return gameTypeList.reduce((acc: L[], cur) => [...acc, ...(cur.l ?? [])], [])
  })
  // 根据id获取游戏
  const getGameById = (id: string) => games.find(item => item.id === id)
  // 根据id获取游戏名称
  const getGameNameById = (id: number | string) => games.find(item => item.id === `${id}`)?.name ?? ''

  // 获取场馆钱包列表
  const { data: platFormList } = $(useRequest(getPlatform, { ready: isLogged }))

  // 有效的场馆钱包列表,后端没有去重，这里去重
  const platList = $computed(() => {
    if (!platFormList)
      return []

    const arr = []
    for (let i = 0; i < platFormList.length; i++) {
      if (platFormList[i].share_wallet === 0) {
        const enable = platFormList[i].maintained === 1
        arr.push({ ...platFormList[i], enable })
      }
      else {
        const enable = platFormList.filter(item => item.wallet_id === platFormList[i].wallet_id).some(item => item.maintained === 1)
        arr.push({ ...platFormList[i], enable })
      }
    }
    // 去重
    const uniqArr = uniqWith(arr, (a, b) => a.wallet_id === b.wallet_id)
    // 去除久赢彩票
    return uniqArr.filter(item => item.wallet_id !== '8840968486572375835')
  })
  // 获取银行卡总列表
  const { data: allBankList } = useRequest(() => getBankList('010'), { ready: isLogged })
  // 获取我的银行卡列表
  const { data: myBankList, run: runGetMyBankList } = $(useRequest(getMyBankList, { ready: isLogged }))
  // 获取我的数字币列表
  const { data: myDigitalList, run: runGetMyDigitalList } = $(useRequest(getDigitalList, { ready: isLogged }))
  // 是否绑定了银行卡
  const isBindBank = $computed(() => !!myBankList?.length)
  // 是否绑定了数字币
  const isBindDigital = $computed(() => !!myDigitalList?.length)
  // 场馆余额不为0的场馆id列表
  const venueWalletIds = $ref(new Set<string>())

  // 客服链接
  const { data: serviceUrl } = useRequest(() => getBannerList(4))
  const openService = () => {
    openLink(serviceUrl.value?.banner[0].url as string)
  }

  // cg彩票是否维护
  const isLotteryMaintain = $computed(() => getGameById('8840968486572375835')?.maintained ?? 1)
  // 彩票下注页面需要隐藏footer
  const showFooter = ref(true)
  // 首页热门彩票列表有多少个11选5（11选5的高度与其他不同）
  const numOfLL5 = ref(0)
  // 全局loading
  const loading = ref(false)

  return $$({
    loading,
    token,
    isLogged,
    navList,
    navGameList,
    platList,
    gameTypeList,
    games,
    venueWalletIds,
    allBankList,
    myBankList,
    runGetMyBankList,
    myDigitalList,
    runGetMyDigitalList,
    setToken,
    clearToken,
    runGetNav,
    getGameById,
    isBindBank,
    isBindDigital,
    openService,
    getGameNameById,
    isLotteryMaintain,
    showFooter,
    numOfLL5,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
