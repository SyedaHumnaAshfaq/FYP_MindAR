const express = require('express');
const router = express.Router();
const { addItemToCart,getCartItems,updateQuantity,deleteCartItem } = require('../controllers/cartController');

router.post('/api/cart/add', addItemToCart);
router.get('/addtocart', getCartItems);
router.put('/api/cart/update', updateQuantity);
router.delete('/api/cart/delete', deleteCartItem);
module.exports = router;