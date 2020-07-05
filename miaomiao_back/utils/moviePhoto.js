const { request } = require('./request')
const cheerio = require('cheerio')
const MoviePhoto = require('../Dao/moviePhoto')
const Movie = require('../Dao/movie')
const moviePhoto = require('../Dao/moviePhoto')
const  get$ = dom => cheerio.load(dom)

const getMoviePhoto =async id => {
  const { data:dom } = await request({url:`/subject/${id}/all_photos`})
  const $ = get$(dom)
  let cover = Object.values($('.pic-col5 li img')).reduce((prev,next) => !!next.attribs && !!next.attribs.src ? [...prev,next.attribs.src] : prev,[])
  return cover
}

const getData = async () => {
  const {length} = await Movie.myFind({})
  for(let _skip=0; _skip < length;_skip++) {
    const [{id,title}] = await Movie.myFind({},{_skip,_limit:1})
    try{
      const cover = await getMoviePhoto(id)
      // let moviePhoto = new MoviePhoto({cover,id})
      // await moviePhoto.mySave()
      // console.log(`${title}存储完成`)
    }catch(e){
      console.log(e)
    }
  } 
  console.log('全部存储完成')
}

getData()

