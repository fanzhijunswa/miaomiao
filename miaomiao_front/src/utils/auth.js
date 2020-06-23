import axios from 'axios'

const instance = axios.create()
instance.defaults.baseURL = '/api'
instance.defaults.withCredentials = true

instance.interceptors.request.use(config => {
  return config
}, err => Promise.reject(err))

instance.interceptors.response.use(
  res => {
    try {
      // throw会阻止后续代码的执行
      if (!res.data.data) throw 'error'
      return res.data.data
    } catch (err) {
      return res
    }
  },
  err => Promise.reject(err)
)

export const request = ({ url, data = '', method = 'get' }) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method,
      [method === 'get' ? 'params' : 'data']: data
    }).then(resp => resolve(resp), e => reject(e))
  })
}