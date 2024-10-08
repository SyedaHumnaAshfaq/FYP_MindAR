const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productAdminController = require('../controllers/productAdminController');


router.get('/products', productController.getAllProducts);
router.get('/products/:category', productController.getProductsbyCategory);
router.get('/productsAdmin', productAdminController.getProductsforAdmin);
router.delete('/products/delete/:id', productAdminController.deleteProduct);
router.post('/products/update-publish-status/:id', productAdminController.updatePublishStatus);
router.post('/products/add', productAdminController.addProduct);
router.get('/products/update/:id', productAdminController.getProductById);
router.put('/products/update/:id', productAdminController.updateProduct);
router.get('/product/getAll', productAdminController.getRefreshedProducts);

module.exports = router;