const mongoose = require('./db')
const Schema = mongoose.Schema
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')
const movieDetailSchema = new Schema({
  id: { //电影唯一id
    type:String,
    required: true
  },
  name: { //标题
    type:String,
    required: true
  },
  image: { //封面
    type:String,
    required: true
  },
  genre: { //类别
    type:Array,
    required: true
  },
  datePublished: {  //发布日期
    type:String,
    required:true
  },
  description: { //简介
    type:String,
    required:true,
    set: value => value.trim()
  },
  aggregateRating: { //评分
    type:Array,
    required:true
  },
  star: { //星星百分比
    type:Array,
    required:true
  },

})

// function set (arr) {
//   arr.map(item => {
//     !!item.url && !/^(https)|(http)/.test(item.url) && (item.url = 'https://movie.douban.com' + item.url)
//     item.id = /\/(\d+)\/$/.exec(item.url)[1]
//     return item
//   })
//   return arr
// }
const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {movieDetailSchema[!index ? 'methods':'statics'][item] = eval(item)})
module.exports = mongoose.model('MovieDetail',movieDetailSchema,'movieDetail')

