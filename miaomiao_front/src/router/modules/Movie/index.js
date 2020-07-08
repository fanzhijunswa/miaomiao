export default [{
  path: '/movie',
  name: 'movie',
  component: () => import('@/views/Movie'),
  children: [{
      path: '/',
      redirect: 'hot'
    },
    {
      path: 'hot',
      name: 'hot',
      component: () => import('@/views/Movie/components/MovieClassic')
    }, 
    {
      path: 'new',
      name: 'new',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieClassic')
    }, 
    {
      path: 'classic',
      name: 'classic',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieClassic')
    }, 
    {
      path: 'play',
      name: 'play',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieClassic')
    }, 
    {
      path: 'high',
      name: 'high',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieClassic')
    }, 
    {
      path: 'cold',
      name: 'cold',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieClassic')
    }, 
  ]
}]
