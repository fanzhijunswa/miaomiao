const cheerio = require('cheerio')
const Actor = require('../Dao/actor')
const MovieDetail = require('../Dao/movieDetail')
const get$ = dom => cheerio.load(dom)
const { request } = require('./request')

const getActorDetail = async id => {
  const { data: dom } = await request({url: `/celebrity/${id}`})
  const $ = get$(dom)
  const pid = id
  const cover = $('#headline img')[0]['attribs']['src'] || ''
  const name = $('#content h1').text()
  const sex = /([\u4e00-\u9fa5]+)/.exec($('.info li')[0].children[2]['data'])[1] || ''
  let constellation = '暂无'
  if(!!/([\u4e00-\u9fa5]+)/.exec($('.info li')[1])) constellation = /([\u4e00-\u9fa5]+)/.exec($('.info li')[1].children[2]['data'])[1] || ''
  let birthday = '暂无'
  if(!!/(\d{4}-\d{2}-\d{2})/.exec($('.info li')[2])) birthday = /(\d{4}-\d{2}-\d{2})/.exec($('.info li')[2].children[2]['data'])[1] || ''
  let birthplace = []
  if(!!$('.info li')[3]) birthplace = $('.info li')[3].children[2]['data'].match(/([\u4e00-\u9fa5]+)/g) || []
  let job = []
  if(!!$('.info li')[4]) job = $('.info li')[4].children[2]['data'].match(/([\u4e00-\u9fa5]+)/g) || []
  const introduce = $('.short').text().trim() || '暂无公开'
  return {pid,name,sex,constellation,birthday,birthplace,job,introduce,cover}
}

const getActor = async () => {
  const {length} = await MovieDetail.myFind({})
  for(let _skip=0; _skip < length;_skip++) {
    const [{director:actorArr}] = await MovieDetail.myFind({},{_skip,_limit:1})
    const actorIdArr = actorArr.map(item => item.id)
    for(let id of actorIdArr) {
      try{
        const item = await getActorDetail(id)
        // let actor = new Actor(item)
        // await actor.mySave()
        // console.log(`${item.name}存储完成`)
      }catch(e){
        console.log(e)
        // _skip--
        // continue
      }
    }
  } 
  console.log('全部存储完成')
  
}
getActor()