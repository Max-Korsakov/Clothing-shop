const express = require('express');
const controller = require("../controllers/cart");
const router = express.Router();



router.post('/',controller.getAll)
//router.post('/', controller.addToCart)



module.exports = router;