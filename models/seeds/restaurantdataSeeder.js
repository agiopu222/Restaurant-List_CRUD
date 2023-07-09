// 載入 mongoose
const mongoose = require('mongoose')

// 載入 restaurantdata model
const RestaurantData = require('../restaurantdata')

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
    for (let i = 0; i < 10; i++) {
      RestaurantData.create({
        name:`name-${i}`,
        category: `哈囉`, 
        image: `哈囉`, 
        location: `哈囉`, 
        phone: `02-1234-5678`, 
        google_map: `哈囉`, 
        rating: `5.0`, 
        description: `哈囉`, 
    })
    }
    console.log('done')
})