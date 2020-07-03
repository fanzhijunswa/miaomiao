import { request } from '@/utils/auth'
// 检测用户是否存在
export const getUserTest = tel => request({ url: '/user/userTest', method: 'post', data: { tel } })
// 登录
export const registerUser = data => request({ url: '/user/register', method: 'post', data })
// 注册
export const loginUser = data => request({ url: '/user/login', method: 'post', data })