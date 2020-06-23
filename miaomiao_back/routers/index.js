const express = require('express')
const router = express.Router()
const home = require('./Home')
const movie = require('./Movie')

router.use('/home', home)
router.use('/movie', movie)
module.exports = router