const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String,
    }
    
})

module.exports = mongoose.model('Category', CategorySchema)