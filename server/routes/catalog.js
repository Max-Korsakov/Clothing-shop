const express = require('express');
const controller = require("../controllers/catalog");
const router = express.Router();



router.get('/',controller.getFilterProps)
router.get('/set',controller.setItem)
router.get('/search',controller.searchItem)
router.get('/data', controller.getAllItemsWithParams)
router.get('/user', controller.getCartItems)
router.get('/:id', controller.getItemById)
router.post('/items', controller.getManyItemsWithId)
  

module.exports = router;