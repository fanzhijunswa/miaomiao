const express = require('express')
const editRouter = express.Router()
const formidable = require('formidable');
const path = require('path')
const User = require('../../../Dao/user')
const mongoose = require('../../../Dao/db')
const _ = require('lodash')

editRouter.post('/',(req,res) => {
  const form = formidable({
    multiples: true,
    //设置上传文件在服务端保存的路径
    uploadDir: path.join(__dirname,"../upload/images"),
    keepExtensions: true
})
// fields是formData中body的内容,也就是append的内容,files就是上传的图片,也就是我们上传的 files
form.parse(req, async (err, fields, files) => {
    let filter = {}
    let { _id,...obj } = fields
    // 说明上传了图片
    if(Object.keys(files).length > 0) {
        // path模块的一个方法,basename可以获取这个文件路径的文件名
        const basename = path.basename(files.cover.path)
        // 这个获取到的是请求地址的主机名,也就是 localhost:4005
        const originUrl = req.headers.host
        // 这里设置的就是我们想要将上传文件保存的路径
        const file_url = `http://localhost:3004/user/upload/images/${basename}`
        obj['cover'] = file_url
    }
    _.forEach(obj,(v,k) => { obj[k] = v })
    await User.myUpdate(filter,{$set:obj})
    const [userObj] = await User.myFind({_id})
    let data = {...(JSON.parse(JSON.stringify(userObj)))}
    res.send({code:200,msg:'响应成功',data})
})
})

module.exports = editRouter