import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // TODO:滚动行为无效，原因未知
  // scrollBehavior(to, from, savedPosition) {
  //   console.log('🚀 ~ file: index.ts ~ line 10 ~ scrollBehavior ~ to', to)
  //   // 始终滚动到顶部
  //   return {
  //     el: '#main',
  //     top: 200,
  //   }
  // },
})
router.beforeEach((to, from, next) => {
  // https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
  const appStore = useAppStore()
  // 未登录，路由需要权限，跳转到登录页
  if (to.meta.auth && !appStore.isLogged)
    next('/entry/login')
  next()
})
router.afterEach(() => {
  // 滚动行为修复
  document.querySelector('#main')?.scrollTo(0, 0)
})
export { routes }
export default router
