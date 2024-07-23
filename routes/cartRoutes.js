const express = require('express');
const router = express.Router();
const { addItemToCart,getCartItems } = require('../controllers/cartController');

router.post('/api/cart/add', addItemToCart);
router.get('/addtocart', getCartItems);
module.exports = router;