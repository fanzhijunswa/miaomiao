// 
const { request } = require('./request')
const cheerio = require('cheerio')
const Movie = require('../Dao/movie')
const FilmReview = require('../Dao/filmReview')
const _ = require('lodash')
const get$ = dom => cheerio.load(dom)

const getComments = async id => {
  const {data:{html}} = await request({url:`/subject/${id}/reviews`,data:{start:0}})
  const $ = get$(html)
  console.log($(".review-list > div"))
  // let allPages = ~~(/\((\d+)\)/.exec($('#content').text())) > 500 ? 500 : ~~(/(\d+)/.exec($('.is-active span').text())[1])
  // console.log($('#content'))
  // console.log(/\((\d+)\)/.exec($('#content')))
  return new Promise(async resolve => {
    for(let start=0; start< 1;start+=20) {
      const {data:dom} = await request({url:`/subject/${id}/reviews`,data:{start}})
      const $ = get$(dom)
      console.log($('.review-list'))
      for(let i=0;i<20;i++) {
        let avatar = $('.review-item .avatar img')
        // console.log(avatar)
        // let name = $('.comment-item .comment-info a')[i].children[0]['data']
        // let score = 50
        // score = !!$('.comment-item .comment-info .rating')[i] ? ~~(/(\d+)/.exec($('.comment-item .comment-info .rating')[i]['attribs']['class'])[1]) : 50
        // let public_time = $('.comment-item .comment-time ')[i].children[0]['data'].trim()
        // let favorite = $('.comment-item .votes ')[i].children[0]['data']
        // let content = $('.comment-item .short ')[i].children[0]['data'].replace('\n','')
        // let type = 0
        // let mid = id
        // let comments = new Comments({avatar,name,score,public_time,favorite,content,type,mid})
        // await comments.mySave()
        resolve()
      }
    }  
  })
} 

const getData = async () => {
  const {length} = await Movie.myFind({})
  for(let _skip=0; _skip < 1;_skip++) {
    const [{id,title}] = await Movie.myFind({},{_skip,_limit:1})
    try{
      await getComments(id)
      // console.log(`${title}存储完成`)
    }catch(e){
      console.log(e)
    }
  } 
  console.log('全部存储完成')
}

getData()