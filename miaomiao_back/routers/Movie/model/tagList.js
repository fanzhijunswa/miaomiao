const express = require('express')
const tagListRouter = express.Router()
const Tag = require('../../../Dao/tag')

tagListRouter.get('/',async (req,res) => {
  const tagList = await Tag.myFind()
  res.send({code:200,msg:'响应成功',data:tagList})
})

module.exports = tagListRouter