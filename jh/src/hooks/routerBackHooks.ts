// 路由返回
const useRouterBack = (defaultPath = 'home') => {
  const router = useRouter()
  const route = useRoute()
  const { query, path } = router.currentRoute.value
  const key = `${path}-from-route`
  const firstRoute: any = sessionStorage.getItem(key)

  // 记录首次 进入页面路由
  if (query.from !== firstRoute && query.from !== undefined)
    sessionStorage.setItem(key, String(query.from))

  function goBack(q?: { [prop: string]: string }) {
    const fromPath = sessionStorage.getItem(key)
    // 如果已存第一次访问路由跳转对应路由
    const toPath: any = fromPath || firstRoute || defaultPath
    router.push({ path: `/${toPath}`, query: q })
  }
  const goTo = (p: string, q?: { [prop: string]: string }) => {
    router.push({ path: p, query: { from: route.path.replace('/', ''), ...q } })
  }

  return {
    goBack,
    goTo,
  }
}

export default useRouterBack
