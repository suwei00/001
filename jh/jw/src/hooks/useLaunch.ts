import type { L } from '~/api/type'

function useLaunch() {
  const appStore = useAppStore()
  const router = useRouter()
  const { open, close } = useLoading()

  /**
   * @description 新标签打开游戏
   * @param {string} id
   * @param {string} [code]
   */
  const openGameNewTag = async (id: string, code?: string) => {
    open()
    const url = await getLaunchPlatUrl(id, code)
    close()
    openLink(url)
  }
  /**
   * @description 页面内iframe打开或者直接本页面打开
   * @param {L} game
   * @param {string} id
   */
  const openWithIframeOrInner = async (game: L, id: string) => {
    open()
    const url = await getLaunchPlatUrl(id)
    close()
    // 如果是IM体育，直接本页面打开
    if (id === '16564048178345')
      return window.location.href = url

    router.push(`/sport-esport-iframe/${encodeURIComponent(url)}`)
  }

  const launch = (id: string, code?: string) => {
    // 传入的是具体的彩种id（k3,pk10,ssc,ll5,lucky28），跳转到购彩大厅并且激活对应的tab
    if (lottery.map(item => item.id).includes(id))
      return router.push(`/cg-lottery?category=${id}`)

    // 久赢彩票,直接跳转到购彩大厅
    if (id === '8840968486572375835')
      return router.push('/cg-lottery')

    // 说明是在游戏列表点击的，新标签打开游戏
    if (id && code)
      return openGameNewTag(id, code)

    const game = appStore.getGameById(id)
    // 如果是体育或者电竞，页面内iframe打开或者直接本页面打开
    if ([6, 8].includes(game!.game_type))
      return openWithIframeOrInner(game!, id)

    // 如果有游戏有path，说明是电子和捕鱼，需要跳转到游戏列表
    if (game?.path)
      return router.push(game.path)

    // 新标签打开游戏
    openGameNewTag(id)
  }
  return { launch }
}

export default useLaunch
