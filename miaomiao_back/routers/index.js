const express = require('express')
const router = express.Router()
const home = require('./Home')
const movie = require('./Movie')
const user = require('./User')

router.use('/home', home)
router.use('/movie', movie)
router.use('/user', user)
module.exports = router