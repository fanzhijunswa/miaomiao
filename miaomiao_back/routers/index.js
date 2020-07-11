const express = require('express')
const router = express.Router()
const home = require('./Home')
const movie = require('./Movie')
const user = require('./User')
const filmReview = require('./FilmReview')

router.use('/home', home)
router.use('/movie', movie)
router.use('/user', user)
router.use('/filmReview', filmReview)
module.exports = router