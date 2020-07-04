const mongoose = require('./db')
const Schema = mongoose.Schema
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')

const movieStarSchema = new Schema({
  id: {
    type:String,
    required: true
  },
  director: {
    type: Array,
    required: true
  },
  author:{
    type:Array,
    required:true
  },
  actor:{
    type:Array,
    required:true
  }
})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {movieStarSchema[!index ? 'methods':'statics'][item] = eval(item)})

module.exports = mongoose.model('MovieStar',movieStarSchema,'movieStar')