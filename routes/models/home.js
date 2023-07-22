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

// 設定search路由
router.get('/search', (req, res) => {
    // 輸入非餐廳名稱, 返回首頁
    if (!req.query.keyword) {
      return res.redirect("/")
    }
    // 取關鍵字
    const keyword = req.query.keyword.toLowerCase()
    // console.log('req.query', req.query)
    restaurantList.find()
    .lean()
    .then( data => {
      const filterRestaurantsData = data.filter ( 
        restaurant => {
        // 名稱或類別其中一個符合就回傳
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
        })
      res.render('index', { restaurants: filterRestaurantsData, keyword: keyword})
    })
})

module.exports = router