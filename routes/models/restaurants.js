const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurantdata')

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
  
// CRUD, C
// 設定路由, 新增頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    restaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// CRUD, R
// 瀏覽特定餐廳
// 瀏覽詳細資料改成透過資料庫取得
router.get('/:id', (req, res) => {
    const id = req.params.id
    restaurantList.findById(id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant: restaurant }))
        .catch(error => console.log(error))
})

// CRUD, U 編輯&更新
// 路由設定
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    restaurantList.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant: restaurant }))
        .catch(error => console.log(error))
})
// 編輯資料
router.put('/:id', (req, res) => {
    const id = req.params.id
    restaurantList.findByIdAndUpdate(id, req.body)
        .then(() => res.redirect(`/${id}`))
        .catch(error => console.log(error))
})

// CRUD, D 刪除
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return restaurantList.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router