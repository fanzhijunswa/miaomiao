const express = require('express')
const home = express.Router()

home.get('/', (req, res) => {
  res.send({
    name: 'xxii'
  })
})

module.exports = home