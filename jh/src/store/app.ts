import { Local } from '~/utils/help'
import hot0 from '~/assets/images/venue/nav/hot-0.png?preset=full'
import hot1 from '~/assets/images/venue/nav/hot-1.gif'
import lottery0 from '~/assets/images/venue/nav/lottery-0.png?preset=full'
import lottery1 from '~/assets/images/venue/nav/lottery-1.gif'
import real0 from '~/assets/images/venue/nav/real-0.png?preset=full'
import real1 from '~/assets/images/venue/nav/real-1.gif'
import electron0 from '~/assets/images/venue/nav/electron-0.png?preset=full'
import electron1 from '~/assets/images/venue/nav/electron-1.gif'
import chess0 from '~/assets/images/venue/nav/chess-0.png?preset=full'
import chess1 from '~/assets/images/venue/nav/chess-1.gif'
import sports0 from '~/assets/images/venue/nav/sports-0.png?preset=full'
import sports1 from '~/assets/images/venue/nav/sports-1.gif'
import fish0 from '~/assets/images/venue/nav/fish-0.png?preset=full'
import fish1 from '~/assets/images/venue/nav/fish-1.gif'
import gaming0 from '~/assets/images/venue/nav/gaming-0.png?preset=full'
import gaming1 from '~/assets/images/venue/nav/gaming-1.gif'
import { getVenueLogo } from '~/static/venueImgList'
import { getBankLogo } from '~/static/bankIconList'
import { getBrowser } from '~/utils/helpers'

const lotteryList = [{
  id: '8840968486572375835',
  name: '快3',
  game_type: 5,
  types: 'k3',
  category: 'k3',
}, {
  id: '8840968486572375835',
  name: 'PK10',
  game_type: 5,
  types: 'pk10',
  category: 'pk10',
}, {
  id: '8840968486572375835',
  name: '时时彩',
  game_type: 5,
  types: 'ssc',
  category: 'ssc',
},
{
  id: '8840968486572375835',
  name: '六合彩',
  game_type: 5,
  types: 'lhc',
  category: 'lhc',
}, {
  id: '8840968486572375835',
  name: '11选5',
  game_type: 5,
  types: '11x5',
  category: 'll5',
}, {
  id: '8840968486572375835',
  name: '幸运28',
  game_type: 5,
  types: 'xy28',
  category: 'lucky28',
}]
const hotPlat = {
  id: 0,
  level: '001000',
  name: '热门',
  sort: 0,

  l: [
    {
      game_type: 5,
      flags: 1,
      maintained: 1,
      id: '8840968486572375835',
      name: 'CG彩票',
      seq: 1,
      share_wallet: 0,
      state: 1,
      wallet_name: 'CG彩票',
      wallet_id: '8840968486572375835',
      types: 'default',
      category: 'default',
    },
    {
      game_type: 2,
      flags: 3,
      maintained: 1,
      id: '2658175169982643138',
      name: 'AG真人',
      seq: 2,
      share_wallet: 0,
      state: 1,
      wallet_name: 'AG钱包',
      wallet_id: '2658175169982643138',
    },
    {
      game_type: 6,
      flags: 3,
      maintained: 1,
      id: '16564048178345',
      name: 'IM体育',
      seq: 10,
      share_wallet: 1,
      state: 1,
      wallet_name: 'IM',
      wallet_id: '16564048178345',
    },
    {
      game_type: 7,
      flags: 3,
      maintained: 1,
      id: '16622699564720',
      name: '开元棋牌',
      seq: 13,
      share_wallet: 0,
      state: 1,
      wallet_name: '开元钱包',
      wallet_id: '16622699564720',
    },
    {
      game_type: 4,
      flags: 3,
      maintained: 1,
      id: '6861705028422769039',
      name: 'PG电子',
      seq: 16,
      share_wallet: 0,
      state: 1,
      wallet_name: 'PG钱包',
      wallet_id: '6861705028422769039',
    },
    {
      game_type: 3,
      flags: 3,
      maintained: 1,
      id: '44196810703047',
      name: 'JDB捕鱼',
      seq: 24,
      share_wallet: 1,
      state: 1,
      wallet_name: 'JDB',
      wallet_id: '46814147030478',
    },
  ],
}
export const useAppStore = defineStore('app', () => {
  const venueList = ref(Local.getItem('venueList') || [])
  const bankList = ref(Local.getItem('bankList') || [])
  const getVenueList = () => {
    getNavRequest().then((res: any) => {
      if (res.status) {
        const resultList = JSON.parse(JSON.stringify(res.data ?? []))
        const oldList = JSON.parse(JSON.stringify(resultList))

        let jyLottery = {} // 单独处理久赢彩票
        oldList.forEach((item: any) => {
          const ls = item.l ?? []
          ls.forEach((it: any) => {
            if (it.id === '8840968486572375835')
              jyLottery = it
          })
        })

        const newLotteryList = JSON.parse(JSON.stringify(lotteryList))
        newLotteryList.forEach((item: any) => {
          item = Object.assign(item, jyLottery)
          return item
        })

        const list = JSON.parse(JSON.stringify(res.data ?? []))
        const hotPlts = JSON.parse(JSON.stringify(hotPlat))
        const hotPltsL: any = []
        hotPlts.l.forEach((item: any) => {
          const hIt = item ?? {}
          resultList.forEach((rIt: any) => {
            const rls = rIt.l ?? []
            rls.forEach((rlIt: any) => {
              if (rlIt.id === hIt.id)
                hotPltsL.push(hIt)
            })
          })
        })
        hotPlts.l = hotPltsL

        list.unshift(hotPlts)

        list.sort((a: any, b: any) => {
          return a.sort - b.sort
        })
        const newList: any = []
        list.forEach((item: any) => {
          const newItem = item
          let ls: any = item.l ?? []
          if (item.id === 5) {
            // 彩票大类
            ls = ls.filter((it: any) => it.id !== '8840968486572375835')
            ls = ls.concat(newLotteryList)
          }

          if (item.id === 0) {
            // 热门大类
            const oldHotl = item.l ?? []
            oldHotl.forEach((hIt: any) => {
              resultList.forEach((rIt: any) => {
                const rls = rIt.l ?? []
                rls.forEach((rlIt: any) => {
                  if (rlIt.id === hIt.id)
                    hIt = Object.assign(hIt, rlIt)
                })
              })
            })

            ls = oldHotl
          }

          newItem.l = ls
          newList.push(newItem)
        })

        const sortList = [0, 5, 2, 6, 7, 4, 3, 8]
        // 按照 sortList 顺序排序
        const nowList = newList.sort((a: any, b: any) => {
          return sortList.indexOf(a.id) - sortList.indexOf(b.id)
        })

        nowList.map((item: any) => {
          const ls = item.l ?? []
          ls.map((it: any) => {
            it.icon = getVenueLogo(it)
            return it
          })

          switch (item.id) {
            case 0:
              item.icon = hot0
              item.activeIcon = hot1
              return item
            case 2:
              item.icon = real0
              item.activeIcon = real1
              return item
            case 3:
              item.icon = fish0
              item.activeIcon = fish1
              return item
            case 4:
              item.icon = electron0
              item.activeIcon = electron1
              return item
            case 5:
              item.icon = lottery0
              item.activeIcon = lottery1
              return item
            case 6:
              item.icon = sports0
              item.activeIcon = sports1
              return item
            case 7:
              item.icon = chess0
              item.activeIcon = chess1
              return item
            case 8:
              item.icon = gaming0
              item.activeIcon = gaming1
              return item
            case 9:
              item.icon = real0
              item.activeIcon = real1

              return item
            default:
              return item
          }
        })

        venueList.value = nowList
        Local.setItem('venueList', nowList)
      }
    })
  }

  const getBankList = () => {
    getBankListRequest().then((res: any) => {
      if (res.status) {
        const list = res.data ?? []
        // list.sort((a: any, b: any) => {
        //   return a.sort - b.sort
        // })
        list.map((item: any) => {
          item.icon = getBankLogo(item.id)
          item.label = item.name
          item.value = item.id
          return item
        })
        bankList.value = list
        Local.setItem('bankList', list)
      }
    })
  }

  // 全局loading
  const loading = ref(false)
  // 全局的弹窗
  const pop = ref(false)
  // app下载地址
  const { isIos } = getBrowser()
  const { data: appDownloadUrl } = useRequest(() => getAppDownloadUrl(isIos ? 36 : 35))
  const downloadUrl = computed(() => `${appDownloadUrl.value?.data.url}?t=${new Date().getTime()}`)

  return {
    venueList,
    getVenueList,
    bankList,
    getBankList,
    loading,
    pop,
    downloadUrl,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
