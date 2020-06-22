import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default new VueRouter({
  routes
})
