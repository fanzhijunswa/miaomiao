const express = require('express')
const movieRouter = express.Router()
const movieListRouter = require('./model/movieList')
const tagListRouter = require('./model/tagList')
const movieDetailRouter = require('./model/movieDetail')

movieRouter.use('/movieList',movieListRouter)
movieRouter.use('/tagList',tagListRouter)
movieRouter.use('/movieDetail',movieDetailRouter)

module.exports = movieRouter