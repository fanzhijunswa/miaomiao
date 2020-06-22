const express = require('express')
const app = express()
const router = require('./routers')
const port = 3003


app.use(router)
app.listen(port, () => console.log('数据库连接成功'))