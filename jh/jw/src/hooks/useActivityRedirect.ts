// 活动列表、弹窗广告、轮播跳转
export default function useActivityRedirect() {
  const router = useRouter()

  // 站内活动跳转
  const goTo = (path: string, id: string) => {
    if (path === 'static')
      router.push({ path: '/activity/stpage', query: { flag: 'static', id } })
    else
      router.push({ path: `/activity/${path}`, query: { flag: path, id } })
  }

  // 场馆跳转
  const { launch } = useLaunch()
  enum LaunchType {
    // 站内
    insideSite = '1',
    // 站外
    outsideSite = '2',
    // 场馆
    venue = '3',
    // 活动
    activity = '4',
  }
  const handleItemClick = (item: any) => {
    if ('flags' in item) {
      const { flags, url } = item
      const path = url.split('/')[1]
      const id = url.split('/')[2]

      switch (flags) {
        // 站内
        case LaunchType.insideSite:
          router.push(url)
          break
        // 站外
        case LaunchType.outsideSite:
          openLink(url)
          break
        // 场馆
        case LaunchType.venue:
          launch(url)
          break
        // 活动
        case LaunchType.activity:
          goTo(path, id)
          break
        default:
          break
      }
    }
    else {
      goTo(item.flag, item.id)
    }
  }

  return {
    handleItemClick,
  }
}
