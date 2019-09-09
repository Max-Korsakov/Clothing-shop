const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({

    type:{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: false
    },
    color: {
        type: Array,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema)