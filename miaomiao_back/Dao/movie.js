const mongoose = require('./db')
//导入增删改
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')
const Schema = mongoose.Schema
const movieSchema = new Schema({
  rate: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  cover:{
    required: true,
    type: String
  },
  id: {
    required: true,
    type: String
  },
  tag: {
    required: true,
    type: Number
  }
})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {movieSchema[!index ? 'methods':'statics'][item] = eval(item)})

module.exports = mongoose.model('Movie',movieSchema,'movie')