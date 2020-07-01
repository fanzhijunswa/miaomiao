const mongoose = require('../Dao/db')
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')

const Schema = mongoose.Schema
const actorSchema = new Schema({
  pid: {
    type:String,
    required:true 
  },
  name: {
    type:String,
    required:true
  },
  constellation: {
    type:String,
    required:true
  },
  birthday:{
    type:String,
    required:true
  },
  birthplace:{
    type:Array,
    required:true
  },
  job:{
    type:Array,
    required:true
  },
  introduce:{
    type:String,
    required:true
  }
})
const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {actorSchema[!index ? 'methods':'statics'][item] = eval(item)})
module.exports = mongoose.model('Actor',actorSchema,'actor')