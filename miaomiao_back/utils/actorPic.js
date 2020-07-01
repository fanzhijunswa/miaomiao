const { request } = require('./request')
const cheerio = require('cheerio')
const ActorPic = require('../Dao/actorPic')
const Actor = require('../Dao/actor')
const _ = require('lodash')
const get$ = dom => cheerio.load(dom)

let npid = ''

const getActorPic = ({pid,start = 0}) => {
  return new Promise(async (resolve,reject) => {
    try{
      const { data: dom } = await request({url:`/celebrity/${pid}/photos/`,data:{start: start *30}})
      const $ = get$(dom)
      if(npid !== pid) {
        npid = pid
        resolve(!!/(\d+)/.test($('.count').text()) ? +(/(\d+)/.exec($('.count').text())[1]) : 1)
      }else {
        let liArr =  _.map($('.poster-col3 > li').find('img'),({attribs:{src = ''}}) => src)
        resolve(liArr)
      }
    }catch(e){
      reject(e)
    }
  })
}

const getData = async () => {
  const {length:countAll} = await Actor.myFind({})
  try{
    for(let _skip=0;_skip<countAll;_skip++) {
      const [{pid,name}] = await Actor.myFind({},{_skip,_limit:1})
      const countPic = await getActorPic({pid})
      let imgList = []
      for(let start=0; start< Math.ceil(countPic / 30);start++) {
        const liArr = await getActorPic({pid,start})
        Array.prototype.push.apply(imgList,liArr)
      }
      const actorPic = new ActorPic({imgList,pid,name})
      await actorPic.mySave()
      console.log(`${name}存储完成`)
    } 
    console.log('全部存储完成')
  }catch(e){
    console.log(e)
  }
}

getData()