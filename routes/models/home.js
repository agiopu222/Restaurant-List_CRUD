// 放和首頁有關的路由

const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurantdata')

router.get('/', (req, res) => {
    restaurantList.find() // 取出 restaurantList model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(restaurants => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router