const mongoose = require('./db')
const Schema = mongoose.Schema
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')
const userSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  pwd:{
    type:String,
    requiredL:true
  },
  email:{
    type:String,
    required: true,
    match: /^\w+@[a-zA-Z0-9]+\.com$/
  },
  tel: {
    type: String,
    required: true,
    match:/^1[3579]\d{9}$/
  },
  sex: {
    type: Number,
    default: 1
  },
  birthday: {
    type: Number,
    set:value => new Date(+value).getTime(),
    default: 0
  },
  introduce: {
    type:String,
    default: ''
  },
  cover:{
    type:String,
    default:''
  }
})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {userSchema[!index ? 'methods':'statics'][item] = eval(item)})

module.exports = mongoose.model('User',userSchema,'user')