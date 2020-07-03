const express = require('express')
const userTestRouter = express.Router()
const User = require('../../../Dao/user')

userTestRouter.post('/', async (req, res) => {
  const { tel } = req.body
  let key = ''
  switch(true) {
    case /@/.test(tel):key ='email';break;                          
    case /^1[3579]\d{9}$/.test(tel):key='tel';break;                          
    default:key='name';                          
  }
  const { length } = await User.myFind({[key]:tel})
  res.send({code:200,msg:'响应成功',data:{type:!!length ? 'register':'login',key}})
})

module.exports = userTestRouter