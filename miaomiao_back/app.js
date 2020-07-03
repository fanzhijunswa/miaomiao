const express = require('express')
const app = express()
const router = require('./routers')
const port = 3004
const bodyParser = require('body-parser')
const { middle } = require('./utils/middle')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use([middle])
app.use(router)
app.listen(port, () => console.log('数据库连接成功'))