const mongoose = require('./db')
//导入增删改
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')
const Schema = mongoose.Schema
const movieSchema = new Schema({
  film_img:String,
  film_title:String,
  film_score:String,
  film_type:{
    type: Array,
    set: data => {
      return !data ? [] : data
    }
  },
  film_actor:{
    type: Array,
    set: data => {
      return !data ? [] : data
    }
  },
  film_time:{
    type: String,
    default: '暂无定期'
  },
  film_tid:Number,
  film_detail_id:String,
  film_evr:String
})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {movieSchema[!index ? 'methods':'statics'][item] = eval(item)})

module.exports = mongoose.model('Movie',movieSchema,'movie')