import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/app'
import { useUserInfoStore } from '~/store/userInfo'
import useBackRouter from '~/hooks/routerBackHooks'

const useLaunchHooks = () => {
  // 场馆loading
  const isLoading = ref<boolean>(false)
  // rrr
  const { venueList } = storeToRefs(useAppStore())
  const { goTo } = useBackRouter()
  const { token } = useUserInfoStore()

  const router = useRouter()

  /**
   * 是否需要在内部Iframe中打开
   * 体育和电竞33333
   */
  const isIframe = (id: string) => {
    const iframeList = venueList.value.reduce((arr: any, item: any) => {
      if (['体育', '电竞'].includes(item.name))
        arr.push(...item.l)

      return arr
    }, [])
    // id = 16564048178345 IM 体育 返回false
    if (id === '16564048178345')
      return false
    if (iframeList.find((item: any) => item.id === id))
      return true
  }

  const launch = (id = '', category = '', code = '') => {
    if (!token) {
      goTo('/entry/login')
      return
    }
    if (['', null, undefined].includes(id) && ['', null, undefined].includes(code))
      return console.log('啥都不传，你想吃粑粑吧？')

    const goListIds = [3, 4] // 电子 捕鱼 跳游戏列表
    let venueType: any = -1
    let title = ''
    const parasm: any = {}
    isLoading.value = true
    if (id && ['', null, undefined].includes(code)) {
      venueList.value.forEach((item: any) => {
        const l = item.l ?? []
        l.forEach((ite: any) => {
          if (ite.id === id) {
            venueType = item.id
            title = ite.name
          }
        })
      })
      if (goListIds.includes(venueType)) // 代表跳转到游戏列表
        return goTo('/games', { id, title })

      else
        parasm.id = id
    }
    else {
      parasm.id = id
      parasm.code = code
    }

    if (['8840968486572375835'].includes(id)) {
      // memberCgcpRequest().then((res: any) => {
      //   if (res.status)
      return router.push({ path: '/lottery', query: { category } })
      // })
    }
    else {
      isLoading.value = true
      getLaunchPlatUrlRequest({
        ...parasm,
      }).then((res: any) => {
        isLoading.value = false
        if (res.status) {
        // window.open(res.data, '_blank')
        // location.href = res.data
          if (isIframe(id))
            router.push({ path: '/igame', query: { gameUrl: res.data } })

          else
            location.href = res.data

          console.log(res, '=========cccccc')
        }
      })
    }
  }

  return {
    launch,
    isLoading,
  }
}

export default useLaunchHooks
