const express = require('express')
const router = express.Router()
const home = require('./Home')

router.use('/home', home)
module.exports = router