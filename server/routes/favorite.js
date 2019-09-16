const express = require('express');
const controller = require("../controllers/favorite");
const router = express.Router();




router.get('/:id', controller.getFavoriteItems)
router.post('/:id', controller.addFavoriteCart)
router.post('/items', controller.getFavoriteItemsObjects)
router.post('/delete/:id', controller.deleteFavoriteItem)


module.exports = router;