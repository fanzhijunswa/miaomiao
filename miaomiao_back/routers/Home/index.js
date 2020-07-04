const express = require('express')
const home = express.Router()
const swipperRourter = require('./model/swipper')

home.use('/swipper',swipperRourter)

module.exports = home