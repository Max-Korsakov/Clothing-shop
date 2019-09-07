const express = require('express');
const controller = require("../controllers/catalog");
const router = express.Router();



router.get('/',controller.getAll)
router.get('/set',controller.setItem)
router.get('/:id', controller.getItemById)
router.post('/filter', controller.getFiltered)


module.exports = router;