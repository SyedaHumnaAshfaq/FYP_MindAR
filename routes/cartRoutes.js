const express = require('express');
const router = express.Router();
const { addItemToCart,checkout, getCartItems, updateQuantity, deleteCartItem } = require('../controllers/cartController');

router.post('/api/cart/add', addItemToCart);
router.get('/addtocart', getCartItems);
router.put('/api/cart/update', updateQuantity);
router.delete('/api/cart/delete', deleteCartItem);
router.get('/checkoutpage', checkout);

module.exports = router;