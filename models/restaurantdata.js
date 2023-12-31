const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定義資料結構
const restaurantDataSchema = new Schema({
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    name_en: {
        type: String, // 資料型別是字串
    },
    category: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    image: {
        type: String, // 資料型別是字串
    },
    location: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    phone: {
        type: String, // 資料型別是字串
    },
    google_map: {
        type: String, // 資料型別是字串
    },
    rating: {
        type: Number, // 資料型別是數字
        required: true // 這是個必填欄位
    },
    description: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    }
})

module.exports = mongoose.model('restaurantData', restaurantDataSchema)