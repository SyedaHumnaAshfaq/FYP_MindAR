const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/createOrder', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.post('/update-order-status', orderController.updateorderstatus);
router.get('/dashboard', orderController.getDashboardData);
// router.get('/adminHomePage', orderController.getDashboardData);
// router.get('/dashboard', orderController.getYesterdayOrders);


module.exports = router;