export default [
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/User'),
    meta: {
      isKeepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/User/Login.vue')
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: () => import('@/views/User/EditUser')
    
  }
]