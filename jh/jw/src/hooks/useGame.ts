// 真人 棋牌 体育 电竞 页面的业务逻辑
import logoBg from '@images/common/logo-bg1.png?preset=full'
import logoBg2 from '@images/common/logo-bg2.png?preset=full'
function useGame(gameType: 'chess' | 'sport' | 'live' | 'esport', brandList: Array<{ id: string;name: string }>, venue: any) {
  const router = useRouter()
  const appStore = useAppStore()
  const { games, gameTypeList } = $(storeToRefs(appStore))
  const { launch } = useLaunch()
  // 排序
  const sortedBrandList = $computed(() => {
    if (!gameTypeList?.length)
      return []
    const list = brandList.map((item) => {
      const o = games.find(i => i.id === item.id)
      return {
        ...o, ...item,
      }
    })
    return sortBy(list, 'seq').filter(item => item.wallet_name)
  })
  // 第一个不维护场馆的index
  const firstIndex = $computed(() => sortedBrandList.findIndex(item => item.maintained === 1) === -1 ? 0 : sortedBrandList.findIndex(item => item.maintained === 1))
  // 当前场馆index
  let currentIndex = $ref(firstIndex)
  // 当前场馆id
  const id = $computed(() => sortedBrandList[currentIndex].id)
  // 选中的场馆
  const game = $(computed(() => sortedBrandList[currentIndex]?.name))
  // 当前场馆
  const currentVenue = $(computed(() => venue[game]))
  // 标题图片
  const titleImg = computed(() => currentVenue?.title ?? '')
  // 描述信息
  const desc = computed(() => currentVenue?.des)
  // 切换场馆
  const handleSwitch = (index: number) => {
    router.push(`/${gameType}`)
    currentIndex = index
  }

  // 鼠标移入移出
  const hoverHandler = (brand: any, e: any) => {
    if (brand.name === game || brand.maintained !== 1)
      return
    e.target.style.backgroundImage = `url(${getSupportImage(logoBg)})`
  }
  const leaveHandler = (brand: any, e: any) => {
    if (brand.name === game || brand.maintained !== 1)
      return
    e.target.style.backgroundImage = `url(${getSupportImage(logoBg2)})`
  }

  return $$({
    currentIndex,
    handleSwitch,
    launch,
    game,
    id,
    titleImg,
    desc,
    currentVenue,
    sortedBrandList,
    hoverHandler,
    leaveHandler,
  })
}

export default useGame
