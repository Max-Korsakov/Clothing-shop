const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    
    cartItems: {
        type: Array,
        required: false
    },
    favoriteItems: {
        type: Array,
        required: false
    }

})

module.exports = mongoose.model('User', userSchema)
