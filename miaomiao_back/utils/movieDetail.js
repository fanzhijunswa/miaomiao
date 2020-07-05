const { request } = require('./request')
const cheerio = require('cheerio')
const MovieDetail = require('../Dao/movieDetail')
const Movie = require('../Dao/movie')
const get$ = dom => cheerio.load(dom)


const getMovieDetail = async () => {
  const {length} = await Movie.myFind({})
  for(let _skip=0; _skip < length;_skip++) {
    const [{id,tag}] = await Movie.myFind({},{_skip,_limit:1})
    try{
      const item = await getData({id,tag})
      // let movieDetail = new MovieDetail(item)
      // await movieDetail.mySave()
      // console.log(`${item['name']}存储完成`)
    }catch(e){
      console.log('请求失败------拦截成功，正在继续请求')
      _skip--
      continue
    }
  } 
  console.log('全部存储完成')
}
getMovieDetail()



async function getData ({id,tag}) {
  const { data: dom } = await request({url: `/subject/${id}`,data: {tag:getCategory(tag)}})
  const $ = get$(dom)
  const {
    name,
    image,
    datePublished,
    genre,                                             
    description,
    aggregateRating
  } = JSON.parse($('script[type="application/ld+json"]')[0].children[0]['data'].replace(/\s/g,''))
  const star = Object.values($('.rating_per')).reduce((prev,next) => !!next.children && !!next.children[0] ? [...prev,next.children[0]['data']] : prev,[])
  return {id,name,image,datePublished,genre,description,aggregateRating,star}
}

function getCategory (tag) {
  switch(tag) {
    case 0 : return '热门'; 
    case 1 : return "最新";
    case 2 : return "经典";
    case 3 : return "可播放";
    case 4 : return "豆瓣高分";
    case 5 : return "冷门佳片";
    case 6 : return "华语";
    case 7 : return "欧美";
    case 8 : return "韩国";
    case 9 : return "日本";
    case 10: return "动作";
    case 11: return "喜剧";
    case 12: return "爱情";
    case 13: return "科幻"
    case 14: return "悬疑"
    case 15: return "恐怖"
    case 16: return "成长"
  }
}
