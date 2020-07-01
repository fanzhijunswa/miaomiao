export default [
  {
    path: '/movieDetail/:id',
    name: 'movieDetail',
    component: () => import('@/views/Detail')
  }
]