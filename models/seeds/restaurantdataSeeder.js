// 載入 restaurantdata model
const restaurantData = require('../restaurantdata')
// 把原本JSON的資料當成seeder
const restaurantList = require("../../restaurant.json")
// 把mongoose的路由設定好
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  restaurantData.create (restaurantList.results)
    .catch(error => console.log(error))
    console.log('done')
})