const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productAdminController = require('../controllers/productAdminController');
const {upload} = require('../s3');


router.get('/productspage', productController.getAllProducts);
router.get('/productspage/:category', productController.getProductsbyCategory);
router.get('/productsAdmin', productAdminController.getProductsforAdmin);
router.delete('/products/delete/:id', productAdminController.deleteProduct);
router.post('/products/update-publish-status/:id', productAdminController.updatePublishStatus);
router.post('/products/add',upload.fields([{ name: 'Product_image' }, { name: 'Product_model_file' }]), productAdminController.addProduct);
router.get('/products/update/:id', productAdminController.getProductById);
router.put('/products/update/:id', productAdminController.updateProduct);
router.get('/product/getAll', productAdminController.getRefreshedProducts);
router.get('/get-product/:id', productAdminController.getProductById);

router.get('/VirtualTryOn', productController.getProductsforVTO);




module.exports = router;