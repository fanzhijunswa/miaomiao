const mongoose = require('./db')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
  
})

module.exports = mongoose.model('Comments',commentsSchema,'comments')