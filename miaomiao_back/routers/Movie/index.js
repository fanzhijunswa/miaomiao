const express = require('express')
const movieRouter = express.Router()
const movieListRouter = require('./model/movieList')
const tagListRouter = require('./model/tagList')
const movieDetailRouter = require('./model/movieDetail')
const movieStarRouter = require('./model/movieStar')
const commentsRouter = require('./model/comments')

movieRouter.use('/movieList',movieListRouter)
movieRouter.use('/tagList',tagListRouter)
movieRouter.use('/movieDetail',movieDetailRouter)
movieRouter.use('/movieStar',movieStarRouter)
movieRouter.use('/comments',commentsRouter)

module.exports = movieRouter