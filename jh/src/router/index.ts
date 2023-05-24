import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log(to, '=======d=as=da==========【路由】sd=fa=sdf=========asfda=sdf=as=d', from, routes)
  if (to.fullPath === '/')
    next('/home') // 重定向到首页
  // if (to.query.token) {

  // }
  if (to.meta && to.meta.requiresAuth)
    next()
  else
    next()
})

export default router
