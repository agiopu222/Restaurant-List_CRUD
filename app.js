// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
// 載入handlebars
const exphbs = require('express-handlebars')
// 載入餐廳資料
const restaurantList = require('./models/restaurantdata')
// 載入新增&編輯頁面資料過濾
const checkData = require('./lib/checkdata')
// 載入 mongoose
const mongoose = require('mongoose')
// 引用 body-parser
const bodyParser = require('body-parser')
// 取得資料庫連線狀態
const db = mongoose.connection
// 載入 method-override
const methodOverride = require('method-override') 

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs' }));
app.set('view engine', 'hbs')

// 設定靜態檔案資料夾位置
app.use(express.static('public'))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

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
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  // console.log('checkData', checkData(req.body))
  if (checkData.checkData(req.body)) {
    restaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  }
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
  restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})
// 編輯資料
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// CRUD, D 刪除
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})