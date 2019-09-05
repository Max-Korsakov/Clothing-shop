const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const Users = require('../models/User')

module.exports.login = async function (req, res) {
    const user = await Users.findOne({ email: req.body.email })
    console.log(req.body.email)
    console.log(user)
    const candidate = user
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
                firstName: candidate.firstName,
                cartItems: candidate.cartItems.length,
              
            }, keys.jwt, { expiresIn: 60 * 60 })
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Неверный пароль"
            })
        }
    } else {
        res.status(410).json({
            message: "Пользователь не найден"
        })
    }
}

module.exports.register = async function (req, res) {
    const candidate = await Users.findOne({ email: req.body.email })

    if (candidate) {
        res.status(409).json({
            message: "Данный email уже зарегистрирован."
        })
    } else {
        console.log('hi')
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const users = new Users({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            firstName: req.body.firstName,
            token: req.body.token
        })
        try {
            await users.save()
            res.status(201).json(users)
        }
        catch (e) {
            errorHandler(res, e)
        }
    }
}