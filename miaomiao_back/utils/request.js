const axios = require('axios')

axios.defaults.baseURL = 'https://movie.douban.com'
let instance = axios.create()

instance.interceptors.request.use(
  config => {
      config.headers['Cookie'] = 'bid=uA4U5DubgFY; douban-fav-remind=1; ll="118130"; __yadk_uid=5ItUpGEsgw4vtxPR7dXWM1KTjx53wOpJ; __gads=ID=eb969beee1bb6389:T=1587879910:S=ALNI_MYMaJ8TLFpxqeQi8c2Ffc7k37Plsw; _vwo_uuid_v2=DCA0F944BCED88DC26140E5353BF4A66D|33e94e0b244e59f70bf30f9d00f874c8; gr_user_id=00246052-b0e6-486e-8895-0681d2790993; viewed="6805117_5290403_6068947_4736167_21792530_3590768_19977785_1087767"; __utma=30149280.500327841.1572235323.1592837148.1593412661.13; __utmb=30149280.0.10.1593412661; __utmc=30149280; __utmz=30149280.1593412661.13.13.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utma=223695111.1392779607.1587879551.1592786914.1593412661.4; __utmb=223695111.0.10.1593412661; __utmc=223695111; __utmz=223695111.1593412661.4.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; _pk_ref.100001.4cf6=%5B%22%22%2C%22%22%2C1593412662%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DJOP7yB-ZWEGi0qgp_yDdlNmnRWFhxTTqzeblzVgZ59NLwzmwOV-9ng0dY0Leo8lP%26wd%3D%26eqid%3D9776aaf90002fb73000000035ef98dcd%22%5D; _pk_ses.100001.4cf6=*; _ga=GA1.2.500327841.1572235323; _gid=GA1.2.1870255202.1593412767; UM_distinctid=172ff04eeea38-0afcb67114ec6e-2d604637-3d10d-172ff04eeeb5d2; Hm_lvt_19fc7b106453f97b6a84d64302f21a04=1593416413; Hm_lpvt_19fc7b106453f97b6a84d64302f21a04=1593416421; _pk_id.100001.4cf6=755cdb5408de3f88.1587879551.4.1593420144.1592787046.; ap_v=0,6.0'
      config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
      config.headers['Host'] = 'movie.douban.com'
      config.headers['Referer'] = 'https://movie.douban.com/explore'
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      return config
  },
  err => {
      return Promise.reject(err);
})

const request = ({url = '',method = 'get',data}) => {
  return new Promise((resolve,reject) => {
    instance({
      url,
      method,
      [method === 'get' ? 'params' : 'data']: data
    }).then(resp => resolve(resp),e => reject(e))
  })
}
exports.request = request