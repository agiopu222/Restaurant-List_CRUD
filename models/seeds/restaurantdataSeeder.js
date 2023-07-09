// 載入 mongoose
const mongoose = require('mongoose')

// 載入 restaurantdata model
const restaurantData = require('../restaurantdata')

// 把原本JSON的資料當成seeder
const restaurantList = require("../../restaurant.json")

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
  console.log('mongoDB connected')

  restaurantData.create (restaurantList.results)
    .catch(error => console.log(error))
    console.log('done')
})