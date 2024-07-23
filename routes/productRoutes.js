const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

router.get('/products', productController.getAllProducts);

module.exports = router;