const { request } = require('./request')
const cheerio = require('cheerio')
const Movie = require('../Dao/movie')
const MovieStar = require('../Dao/movieStar')
const Actor = require('../Dao/actor')
const get$ = dom => cheerio.load(dom)

const ceshi = arr => {
  return new Promise(async resolve => {
    let data = arr.reduce(async (prev,next) => {
      let pid = /\/(\d+)\/$/.exec(next.url)[1]
      const [{cover = ''} = {}] = await Actor.myFind({pid})
      return [...await prev,{cover,name:next.name,pid}]
    },Promise.resolve([]))
    resolve(data)
  })
}

const getMovieStar = async () => {
  const {length} = await Movie.myFind({})
  for(let _skip=0; _skip < length;_skip++) {
    const [{id,tag,title}] = await Movie.myFind({},{_skip,_limit:1})
    const { director:newDirector,actor:newActor,author:newAuthor }  = await getData({id,tag})
    let director = await ceshi(newDirector)
    let actor = await ceshi(newActor)
    let author = await ceshi(newAuthor)
    // let movieStar = new MovieStar({director,actor,author,id})
    // await movieStar.mySave()
    // console.log(`${title}存储完成`)
  } 
  console.log('全部存储完成')
}
getMovieStar()



async function getData ({id,tag}) {
  const { data: dom } = await request({url: `/subject/${id}`,data: {tag:getCategory(tag)}})
  const $ = get$(dom)
  const {
    director,
    actor,
    author
  } = JSON.parse($('script[type="application/ld+json"]')[0].children[0]['data'].replace(/\s/g,''))
  const star = Object.values($('.rating_per')).reduce((prev,next) => !!next.children && !!next.children[0] ? [...prev,next.children[0]['data']] : prev,[])
  return {director,actor,author}
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

/* 1个电影 对应 1个电影详情
1个电影详情 对应 多个演职人员
1个影星 对应 1个影星图库
*/