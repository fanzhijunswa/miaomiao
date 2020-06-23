const { request } = require('@/utils/auth')

export const getMovieList = data => request({ url: '/movie/movieList', data, method: 'post' })