const mongoose = require('./db')
//导入增删改
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')

const Schema = mongoose.Schema
const moviePhotoSchema = new Schema({
  id:{
    type:String,
    required:true
  },
  cover:{
    type:Array,
    required:true
  }
})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {moviePhotoSchema[!index ? 'methods':'statics'][item] = eval(item)})
module.exports = mongoose.model('MoviePhoto',moviePhotoSchema,'moviePhoto')