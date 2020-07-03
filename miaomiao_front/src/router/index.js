import Vue from 'vue'
import VueRouter from 'vue-router'
import { get } from '@/libs/util'

Vue.use(VueRouter)

let routes = [{
  path: '/',
  redirect: '/home'
}]

const routerModule = require.context('./modules', true, /index\.js$/)
routerModule.keys().forEach(item => {
  Array.prototype.push.apply(routes, routerModule(item).default)
  // routes = [...routes, ...(routerModule(item).default)]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  if (to.path === '/userInfo' && !get('token')) {
    return next('/login')
  }
  // if (/^\/movieDetail/.test(from.path) && /^\/login/.test(to.path) && !get('token')) {
  //   return next('/movie')
  // }
  // if (/^\/login/.test(to.path) && get('token')) {
  //   return next(from.path)
  // }
  next()
})

export default router
