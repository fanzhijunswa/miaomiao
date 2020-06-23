const express = require('express')
const movieRouter = express.Router()
const Movie = require('../../Dao/movie')


movieRouter.post('/movieList',async (req,res) => {
  const { film_tid,current } = req.body
  const data = await Movie.myFind({film_tid},{_limit:10,_skip: current * 10})
  res.send({code:1,msg:'响应成功',data})
})

module.exports = movieRouter