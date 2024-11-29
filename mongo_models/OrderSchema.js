const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

  cartId: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
      },
      
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  billingAddress: {

    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },

  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  method: {
    type: String,
    enum: ['card', 'cod'],
    required: true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
