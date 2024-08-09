const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
router.get('/customers', customerController.getCustomers);
router.delete('/customers/delete/:id', customerController.deleteCustomer);

module.exports = router;