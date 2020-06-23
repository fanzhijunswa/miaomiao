const cheerio = require('cheerio')
const axios = require('axios')
const Movie = require('./Dao/movie')
const get$ = dom => cheerio.load(dom)
const _ = require('lodash')
axios.defaults.baseURL = 'https://maoyan.com/films'
let instance = axios.create()


instance.interceptors.request.use(
  config => {
      config.headers['Cookie'] = '__mta=150313225.1592787055823.1592875254838.1592875272584.20; uuid_n_v=v1; uuid=5DC1F9F0B42311EAB11C23537EB4C64B6D686A91C8664390927A6B76DE5C2571; _lxsdk_cuid=172d981b4286a-04a156d36f60df-5f1d3a17-1fa400-172d981b429c8; _lxsdk=5DC1F9F0B42311EAB11C23537EB4C64B6D686A91C8664390927A6B76DE5C2571; mojo-uuid=12e347d11ca60f6ad10ae9f7ee6e45bd; recentCis=1%3D155; _csrf=eb81da43d7767f45c39823368a970af646a63bcb2e500218ccab26099073d5c5; Hm_lvt_703e94591e87be68cc8da0da7cbd0be2=1592806751,1592809253,1592835519,1592875108; _lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; mojo-session-id={"id":"ce51cedac9bb246bbba79b80ed3018db","time":1592875108624}; Hm_lpvt_703e94591e87be68cc8da0da7cbd0be2=1592876153; __mta=150313225.1592787055823.1592875272584.1592876153651.21; mojo-trace-id=21; _lxsdk_s=172dec147bb-5d3-5ff-2fa%7C%7C32'
      config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
      config.headers['Referer'] = 'https://maoyan.com/'
      return config
  },
  err => {
      return Promise.reject(err);
})

const getFilmData = (offset) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url: '/',
      params: {
        showType: 2,
        ...offset
      }
    }).then(({data}) => {
      resolve(data)
    }, e => reject('获取失败'))
  })
}

const ceshi = async () => { 

  try {
    for(let i = 0; i< 1000;i++) {
      const $ = get$(await getFilmData({offset: i * 30}))
      for(let j=0; j < 30; j++) {
        let movie = new Movie()
        const film_tid = 1
        const film_detail_id = /\/(\d+)$/.exec($('.movie-item a')[j]['attribs']['href'])[1]
        const film_img = $('.movie-poster img:last-child')[j]['attribs']['data-src']
        const film_title = $('.movie-item-title')[j]['attribs']['title']
        // const film_score = Math.ceil(Math.random() * 10000000)
        const film_score = $('.movie-item-title')[j].next.next.children[0].type === 'text' ?
        $('.movie-item-title')[j].next.next.children[0].data :
        $('.movie-item-title')[j].next.next.children[0].children[0].data + 
        $('.movie-item-title')[j].next.next.children[1].children[0].data
        // 0 3 6 9 是每个电影的分类
        // 1 4 7 10 是每个电影的主演
        const film_type = $('.hover-tag')[j*3].next.data.match(/([\u4e00-\u9fa5_a-zA-Z0-9]+)(?=／|\/)/g)
        const film_actor = $('.hover-tag')[j*3+1].next.data.match(/([\u4e00-\u9fa5_a-zA-Z0-9]+)(?=／|\/)/g)
        let film_time = '暂无定期'
        try{
          film_time = /(\d{4}-\d{2}-\d{2})|(\d{4})|(\d{4}-\d{2})/.exec($('.hover-tag')[j*3+2].next.data)[1]
        }catch(e){
          film_time = '暂无定期'
        }
        const film_evr = !$('.movie-ver')[j].children[0] ? '' : $('.movie-ver')[j].children[0]['attribs']['class']
        _.forEach(['film_tid','film_img','film_title','film_score','film_type','film_actor','film_detail_id','film_time','film_evr'],item => {
          movie[item] = eval(item)
        })
        await movie.mySave()
        console.log('保存完成')
      }
    }
    console.log('全部执行完毕')
    
  } catch (e) {
    console.log(e)
  }

}

ceshi()