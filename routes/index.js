const express = require('express')
const router = express.Router()

// 設定首頁路由
const home = require('./models/home')
router.use('/', home)
module.exports = router