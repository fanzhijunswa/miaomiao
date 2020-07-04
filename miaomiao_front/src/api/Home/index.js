import { request } from '@/utils/auth'
export const getSwipper = () => request({ url: '/home/swipper' })