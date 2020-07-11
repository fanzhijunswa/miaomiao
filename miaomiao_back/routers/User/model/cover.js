const express = require('express')
const coverRouter = express.Router()
const fs = require('fs')
const path = require('path')

coverRouter.get('/:image_url',(req,res) => {
  const { image_url } = req.params
  fs.readFile(path.join(__dirname,`../upload/images/${image_url}`),(err,data) => {
    if(err) throw err
    res.send(data)
  })
})

module.exports = coverRouter