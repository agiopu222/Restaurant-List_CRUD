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
//載入ember-truth-helpers，這樣才能使用{{#if (eq value1 value2 )}}的判斷
const emberTruthHelpers = require('ember-truth-helpers')
// 載入路由
const routes = require('./routes')

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
app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})