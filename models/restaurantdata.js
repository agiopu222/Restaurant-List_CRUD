const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
    name: {
        name: string, 
        category: string, 
        image: string, 
        location: string, 
        phone: string, 
        google_map: string, 
        rating: number, 
        description: string, 
        required: true // 這是個必填欄位
    }
})
module.exports = mongoose.model('Todo', todoSchema)