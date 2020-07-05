const express = require('express')
const movieStarRouter = express.Router()
const MovieStar = require('../../../Dao/movieStar')

movieStarRouter.get('/:id',async (req,res) => {
  const { id } = req.params
  const [data] = await MovieStar.myFind({id})
  res.send({code:200,msg:'响应成功',data})
})

module.exports = movieStarRouter