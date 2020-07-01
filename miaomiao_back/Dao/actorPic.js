const mongoose = require('../Dao/db')
const Schema = mongoose.Schema
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')

const actorPicSchema = new Schema({
  pid: {
    type:String,
    required:true
  },
  imgList:{
    type:Array,
    required:true
  },
  name:{
    type:String,
    required:true
  }
})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {actorPicSchema[!index ? 'methods':'statics'][item] = eval(item)})
module.exports = mongoose.model('ActorPic',actorPicSchema,'actorPic')