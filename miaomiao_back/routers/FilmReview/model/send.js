const express = require('express')
const sendFilmReviewRouter = express.Router()

sendFilmReviewRouter.post('/',(req,res) => {
  console.log(1)
})
module.exports = sendFilmReviewRouter