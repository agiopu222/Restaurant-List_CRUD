// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
// 載入handlebars
const exphbs = require('express-handlebars')
// 載入JSON
const restaurantList = require('./restaurant.json')

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs' }));
app.set('view engine', 'hbs')

// 設定靜態檔案資料夾位置
app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
    res.render('index', { lists: restaurantList.results })
  })

// 設定search路由
app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const lists = restaurantList.results.filter (
    function(restaurants) {
      return lists.title.includes(keyword)
  })
  res.render('index', { lists: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  // console.log('req.params.id', req.params.id) //在首頁點選餐廳，會跑出正確的id
  // const lists = restaurantList.results.find (
  //   function(restaurants) {
  //     return restaurants.id.toString() === req.params.id })
  const lists = restaurantList.results.find (
    restaurants => restaurants.id.toString() === req.params.id )
    
  res.render('show', { lists: lists })
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})