const express = require('express')
const router = express.Router()

// 設定首頁路由
const home = require('./models/home')
const restaurants = require('./models/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router