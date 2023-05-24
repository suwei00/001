import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const { routeList } = storeToRefs(useAppStore())
  const atLast = routeList.value[routeList.value.length - 1]
  if (to.path === '/' || to.path === '/friends')
    sessionStorage.removeItem('CHAT_DATA')

  if (to.path !== from.path && atLast !== to.fullPath)
    routeList.value.push(from.fullPath)
  else
    routeList.value.pop()

  next()
})
export { routes }
export default router
