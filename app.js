// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
// 載入handlebars
const exphbs = require('express-handlebars')

// 載入餐廳資料
const restaurantList = require('./models/restaurantdata')

// 載入 mongoose
const mongoose = require('mongoose')

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs' }));
app.set('view engine', 'hbs')

// 設定靜態檔案資料夾位置
app.use(express.static('public'))

// 設定路由
// 首頁, 瀏覽全部餐廳
app.get('/', (req, res) => {
  restaurantList.find() // 取出 restaurantList model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 設定search路由
app.get('/search', (req, res) => {
  // 輸入非餐廳名稱, 返回首頁
  if (!req.query.keyword) {
    return res.redirect("/")
  }
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const filterRestaurantsData = restaurantList.results.filter ( restaurants => {
      return restaurants.name.includes(keyword)
  })
  res.render('index', { restaurants: filterRestaurantsData, keyword: keyword})
})

// CRUD, C
// 設定路由, 新增頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  restaurantList.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// CRUD, R
// 瀏覽特定餐廳
// 瀏覽詳細資料改成透過資料庫取得
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// CRUD, U 編輯&更新
// 路由設定
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})
// 編輯資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const data = req.body
  return restaurantList.findById(id)
    .then((restaurant) => {
      restaurant.data = data
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})