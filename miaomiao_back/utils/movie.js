const cheerio = require('cheerio')
const Movie = require('../Dao/movie')
const get$ = dom => cheerio.load(dom)
const { request } = require('./request')
let page_start = 0
let page_limit = 20


const getMovie = ({page_limit,page_start}) => {
  return new Promise(async (resolve,reject) => {
    try{
      const {data: {subjects}} = await request({url: '/j/search_subjects',data: {type:'movie',tag: '热门',sort:'recommend',page_limit,page_start}})
      resolve(subjects)
    }catch(e){
      reject(e)
    }
  })
}

const getdata = async () => {
  for(let i=0; i< 1;i++) {
    let data = await getMovie({page_limit,page_start})
    for(let item of data) {
      item.tag = 0
      let movie = new Movie(item)
      // movie.mySave()
    }
    console.log(`存储${i}完成`)
    page_start+=20
  }
  console.log('存储全部成功')
}

getdata()