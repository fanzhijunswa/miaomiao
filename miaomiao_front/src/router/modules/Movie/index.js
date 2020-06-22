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
      component: () => import('@/views/Movie/components/MovieContent')
    }, {
      path: 'future',
      name: 'future',
      component: () => import('@/views/Movie/components/MovieContent')
    }, {
      path: 'classic',
      name: 'classic',
      component: () => import('@/views/Movie/components/MovieContent')
    },
  ]
}]
