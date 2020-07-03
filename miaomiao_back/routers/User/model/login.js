const express = require('express')
const loginRouter = express.Router()
const User = require('../../../Dao/user')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  const data = req.body
  // if(!Object.keys(userObj).length) return res.status(666).send('账户或密码错误')
  // let token = jwt.sign({...(JSON.parse(JSON.stringify(userObj)))} , 'inthecloset', { expiresIn: 10 });
  // res.send({code:200,msg:'响应成功',data:{...(JSON.parse(JSON.stringify(userObj))),token}})
})

module.exports = loginRouter