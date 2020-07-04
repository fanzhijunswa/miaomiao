const express = require('express')
const loginRouter = express.Router()
const User = require('../../../Dao/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

loginRouter.post('/', async (req, res) => {
  const data = req.body
  const user = new User(data)
  await user.mySave()
  const userObj = _.get(await User.myFind(),'0',{})
  let token = jwt.sign({...(JSON.parse(JSON.stringify(userObj)))} , 'inthecloset', { expiresIn: 60 * 120 });
  res.send({code:200,msg:'响应成功',data:{...(JSON.parse(JSON.stringify(userObj))),token}})
})

module.exports = loginRouter