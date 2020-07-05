const express = require('express')
const commentsRouter = express.Router()
const Comments = require('../../../Dao/comments')

commentsRouter.get('/:mid',async (req,res) => {
  const { mid } = req.params
  const data = await Comments.myFind({mid},{_limit:10})
  res.send({code:200,msg:'响应成功',data})
})

module.exports = commentsRouter