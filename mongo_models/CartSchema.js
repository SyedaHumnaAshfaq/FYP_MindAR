const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cartId: { type: String, required: true, unique: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;