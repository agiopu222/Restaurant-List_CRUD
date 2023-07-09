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

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs' }));
app.set('view engine', 'hbs')

// 設定靜態檔案資料夾位置
app.use(express.static('public'))

// 設定路由
// 瀏覽
app.get('/', (req, res) => {
  restaurantList.find() // 取出 restaurantList model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(lists => res.render('index', { lists: lists })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 設定search路由
app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const lists = restaurantList.filter (
    function(restaurants) {
      return lists.title.includes(keyword)
  })
  res.render('index', { lists: restaurantList })
})

app.get('/restaurants/:_id', (req, res) => {
  // console.log('req.params.id', req.params.id) //在首頁點選餐廳，會跑出正確的id
  // const lists = restaurantList.results.find (
  //   function(restaurants) {
  //     return restaurants.id.toString() === req.params.id })
  const lists = restaurantList.find (
    restaurants => restaurants._id == req.params._id )
    
  res.render('show', { lists: lists })
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})