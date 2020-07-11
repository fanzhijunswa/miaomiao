import { request } from '@/utils/auth'

// 发表评论
export const sendFilmReview = data => request({ url: '/filmReview/send', data, method: 'post' })