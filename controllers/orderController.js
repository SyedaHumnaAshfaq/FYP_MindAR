const Order = require('../mongo_models/OrderSchema');
const createOrder = async (req, res) => { 
    try {
        const { products, totalAmount, shippingAddress,method } = req.body;
        const cartId = req.cookies.cartId; 
        if (!cartId) {
            return res.status(400).json({ message: 'Cart not found' });
        }
        const newOrder = new Order({ cartId, products, totalAmount, shippingAddress,method });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
      } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
      }
}
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
      }
}
module.exports = { createOrder,getOrders };