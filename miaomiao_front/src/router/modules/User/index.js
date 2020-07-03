export default [
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/User/User.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/User/Login.vue')
  }
]