const express = require('express');
const passport = require('passport')
const authRoutes = require('./routes/auth')
const catalogRoutes = require('./routes/catalog')
const cartRoutes = require('./routes/cart')
const bodyParser = require('body-parser')

const cors = require('cors')
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(morgan('dev'))
app.use("/uploads", express.static('/uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/auth', authRoutes)
app.use('/catalog', catalogRoutes)
app.use('/cart', cartRoutes)

module.exports = app;