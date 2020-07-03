const express = require('express')
const movieDetailRouter = express.Router()
const MovieDetail = require('../../../Dao/movieDetail')
const Actor = require('../../../Dao/actor')
const _ = require('lodash')
const ceshi = pid => {
  return new Promise(async (resolve,reject) => {
    Actor.aggregate([
      { $match:{pid} },
      {
        $lookup:{
          "from": "actorPic", //想要嵌套的子表
          localField: "pid", //父表匹配的字段
          foreignField: "pid", //子表匹配的字段
          as: "user_pic" //输出到父表的嵌套属性名
        }
      }
    ],(err,[data]) => {
      if(err) return reject([])
      resolve(data)
    })
  })
}

const ceshi2  = list => {
  return new Promise(async resolve => {
    let newList = []
    for(let item of list) {
      let newItem = _.get(await Actor.myFind({pid:item.id}),'0',{})
      let {pid = ''} = newItem
      const data = await ceshi(pid) || {}
      let user_image = ''
      if(!!Object.keys(data).length) {
        try{
          user_image = data.user_pic[0].imgList[0]
        }catch(e){
          user_image = ''
        }
      }
      newItem = {...(JSON.parse(JSON.stringify(newItem))),user_image}
      newList.push(newItem)
    }
    resolve(newList)
  })
}

const movieDetailAggregar = id => {
  return new Promise(async resolve => {
    const final = (await MovieDetail.myFind({id}))[0]
    const {actor,author,director} = final
    const newActor = await ceshi2(actor)
    const newAuthor = await ceshi2(author)
    const newDirector = await ceshi2(director)
    final.actor = newActor
    final.author = newAuthor
    final.director = newDirector
    let allStar = [...newActor,...newAuthor,...newDirector]
    let newAllStar = []
    _.forEach(allStar,item => {
      let flag = false
      _.forEach(newAllStar,i => {
        i.name === item.name && (flag = true)
      })
      !flag && newAllStar.push(item)
    })
    resolve({final,allStar:newAllStar,watchAll:[newDirector,newAuthor,newActor]})
  })
}


movieDetailRouter.get('/:id',async (req,res) =>{
  const { id } = req.params
  const {final,allStar,watchAll} = await movieDetailAggregar(id)
  res.send({code:200,msg:'响应成功',data:{...(JSON.parse(JSON.stringify(final))),allStar,watchAll}})
})

module.exports = movieDetailRouter