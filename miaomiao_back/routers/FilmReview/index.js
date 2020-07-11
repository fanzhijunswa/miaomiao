const express = require('express')
const filmReviewRouter = express.Router()
const sendFilmReviewRouter = require('./model/send')

filmReviewRouter.use('/send',sendFilmReviewRouter)
module.exports = filmReviewRouter