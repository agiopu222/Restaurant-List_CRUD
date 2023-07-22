// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override') 
//載入ember-truth-helpers，這樣才能使用{{#if (eq value1 value2 )}}的判斷
const emberTruthHelpers = require('ember-truth-helpers')

// 載入路由, 自己定義的
const routes = require('./routes')
require('./config/mongoose')

// 使用套件才會產生的東西放後面
const app = express()

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs' }));
app.set('view engine', 'hbs')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
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