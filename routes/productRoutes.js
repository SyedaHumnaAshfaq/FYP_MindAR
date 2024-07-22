const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getAllProducts', productController.getAllProducts);

module.exports = router;