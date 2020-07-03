const express = require('express')
const userRouter = express.Router()
const loginRouter = require('./model/login')
const userTestRouter = require('./model/userTest')
const registerRouter = require('./model/register')

userRouter.use('/login',loginRouter)
userRouter.use('/userTest',userTestRouter)
userRouter.use('/register',registerRouter)

module.exports = userRouter