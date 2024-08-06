const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/createOrder', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.post('/update-order-status', orderController.updateorderstatus);
// router.get('/filter-by-order-status', orderController.fiterbyorderstatus);

module.exports = router;