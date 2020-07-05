const mongoose = require('./db')
const Schema = mongoose.Schema
const { mySave,myFind,myDelete,myUpdate } = require('./utils/index')

const commentsSchema = new Schema({
  pid:{ //评论人,关联用户表
    type:String,
    default:'cheerio',
    index:true
  },
  avatar:{
    type:String,
    required:true
  },
  type:{ //该短评是爬取的，还是用户真实的 1为真实用户，0为爬取用户
    type:Number,
    required:true,
    index:true
  },
  mid:{ //电影唯一id 关联电影表
    type:String,
    required:true,
    index:true
  },
  score:{ //星星分数
    type:Number,
    required:true
  },
  public_time:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  favorite:{ //获赞数
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  }

})

const arr = ['mySave','myFind','myDelete','myUpdate']
arr.forEach((item,index) => {commentsSchema[!index ? 'methods':'statics'][item] = eval(item)})

module.exports = mongoose.model('Comments',commentsSchema,'comments')