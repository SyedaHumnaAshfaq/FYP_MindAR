const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productAdminController = require('../controllers/productAdminController');


router.get('/products', productController.getAllProducts);
router.get('/products/:category', productController.getProductsbyCategory);
router.get('/productsAdmin', productAdminController.getProductsforAdmin);
router.delete('/products/delete/:id', productAdminController.deleteProduct);

module.exports = router;