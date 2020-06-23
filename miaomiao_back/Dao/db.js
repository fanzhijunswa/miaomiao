const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/miaomiao')
const db = mongoose.connection
db.once('open',() => console.log('数据库连接已开启'))
module.exports = mongoose