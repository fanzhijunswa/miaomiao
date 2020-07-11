const express = require('express')
const userRouter = express.Router()
const loginRouter = require('./model/login')
const userTestRouter = require('./model/userTest')
const registerRouter = require('./model/register')
const editRouter = require('./model/edit')
const coverRouter = require('./model/cover')

userRouter.use('/login',loginRouter)
userRouter.use('/userTest',userTestRouter)
userRouter.use('/register',registerRouter)
userRouter.use('/edit',editRouter)
userRouter.use('/upload/images',coverRouter)


module.exports = userRouter