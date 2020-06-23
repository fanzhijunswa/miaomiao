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
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieHot')
    }, {
      path: 'future',
      name: 'future',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieFuture')
    }, {
      path: 'classic',
      name: 'classic',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Movie/components/MovieClassic')
    },
  ]
}]
