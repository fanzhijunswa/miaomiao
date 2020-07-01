const { request } = require('@/utils/auth')

export const getMovieList = data => request({ url: '/movie/movieList', data, method: 'post' })
// 获取分类列表
export const getTag = () => request({ url: '/movie/tagList' }) 
// 获取电影详情
export const getmovieDetail = id => request({ url: `/movie/movieDetail/${id}` })