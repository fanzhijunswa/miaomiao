const express = require('express')
const movieDetailRouter = express.Router()
const MovieDetail = require('../../../Dao/movieDetail')
const _ = require('lodash')

const movieStarAggregate = id => {
  return new Promise(async resolve =>{
    MovieDetail.aggregate([
      {
        $match: {id}
      },
      {
        $lookup:{
            from: "movieStar", //想要嵌套的子表
            localField: "id", //父表匹配的字段
            foreignField: "id", //子表匹配的字段
            as: "movieStar" //输出到父表的嵌套属性名
        }
      },
      {
        $lookup:{
            from: "moviePhoto", //想要嵌套的子表
            localField: "id", //父表匹配的字段
            foreignField: "id", //子表匹配的字段
            as: "moviePhoto" //输出到父表的嵌套属性名
        }
      },
    ],(err,[data]) => {
      if(err) return resolve([])
      resolve([data,data.movieStar[0],data.movieStar[0].actor,data.moviePhoto[0]])
    })
  })
}

movieDetailRouter.get('/:id',async (req,res) =>{
  const { id } = req.params
  const [data,movieStar,actor,moviePhoto] = await movieStarAggregate(id)
  res.send({code:200,msg:'响应成功',data:{...JSON.parse(JSON.stringify(data)),movieStar,actor,moviePhoto}})
  // const {final,allStar,watchAll} = await movieDetailAggregar(id)
  
})

module.exports = movieDetailRouter