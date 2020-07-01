const express = require('express')
const movieListRouter = express.Router()
const Movie = require('../../../Dao/movie')
const { reject } = require('lodash')

const tagAggregate = ({$match,$limit,$skip}) => {
  return new Promise(resolve => {
      Movie.aggregate([
        {
          $match
        },
        {
          $skip
        },
        {
            $lookup:{
                from: "movieDetail", //想要嵌套的子表
                localField: "id", //父表匹配的字段
                foreignField: "id", //子表匹配的字段
                as: "detail" //输出到父表的嵌套属性名
            },
            
        },
        {
            $limit
        }
    ],(err,data) =>{
        if(err) return reject(err)
        resolve(data)
    })
  })
}

movieListRouter.post('/',async (req,res) => {
  const { tag,current } = req.body
  const data = await tagAggregate({$match:{tag},$limit:10,$skip: current * 10})
  res.send({code:1,msg:'响应成功',data})
})

module.exports = movieListRouter