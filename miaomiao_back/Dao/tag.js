const mongoose = require('./db')
const Schema = mongoose.Schema
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')
const tagSchema = new Schema({
  tag:{
    type:Number,
    required:true
  },
  ename:{
    type:String,
    required:true
  },
  cname:{
    type:String,
    required:true
  }
})
const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {tagSchema[!index ? 'methods':'statics'][item] = eval(item)})
module.exports = mongoose.model('Tag',tagSchema,'tag')