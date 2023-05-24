import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { useCache } from "@/store/cacheRouter";

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to: any) => {
  useCache().SAVE_CACHE(to.name); // 添加缓存进页面
});

export { routes }
export default router
