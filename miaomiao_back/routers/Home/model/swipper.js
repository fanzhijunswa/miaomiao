const express = require('express')
const swipperRouter = express.Router()
const Movie = require('../../../Dao/movie')

swipperRouter.get('/',async (req,res) => {
  const data = await Movie.myFind({},{_limit:6})
  res.send({code:200,msg:'响应成功',data})
})

module.exports = swipperRouter