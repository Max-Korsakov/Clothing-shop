const express = require('express');
const controller = require("../controllers/cart");
const router = express.Router();



router.post('/',controller.getAll)
router.get('/:id', controller.getCartItems)

router.post('/:id', controller.addToCart)
router.post('/delete/:id', controller.deleteCartItem)


module.exports = router;