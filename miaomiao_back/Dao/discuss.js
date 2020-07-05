const mongoose = require('./db')
const Schema = mongoose.Schema
const discussSchema = new Schema({
  pid:{ //评论人id 关联 user表的_id
    type:String,
    required:true
  },
  byId:{ //被评论人id 关联user表的_id
    type:String,
    required:true
  },
  cid:{ //短评id 关联comments 表的_id
    type:String,
    required:true
  },
  publish_time:{
    type:Number,
    default:Date.now()    
  },
  content:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Discuss',discussSchema,'discuss')