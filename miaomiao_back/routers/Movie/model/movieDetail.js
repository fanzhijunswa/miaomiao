const express = require('express')
const movieDetailRouter = express.Router()
const MovieDetail = require('../../../Dao/movieDetail')

movieDetailRouter.get('/:id',async (req,res) =>{
  const { id } = req.params
  const data = await MovieDetail.myFind({id})
  res.send({code:200,msg:'响应成功',data})
})

module.exports = movieDetailRouter