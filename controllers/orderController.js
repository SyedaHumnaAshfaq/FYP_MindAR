const Order = require('../mongo_models/OrderSchema');
const createOrder = async (req, res) => { 
    try {
        const { customerName,products, totalAmount, shippingAddress,method } = req.body;
        const cartId = req.cookies.cartId; 
        if (!cartId) {
            return res.status(400).json({ message: 'Cart not found' });
        }
        const newOrder = new Order({customerName, cartId, products, totalAmount, shippingAddress,method });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
      } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
      }
}
const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({});
        res.render('pages/orders', { orders });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
      }
}
const updateorderstatus = async (req, res) => {
    const { order_id, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(order_id, { status: status }, { new: true });
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true });
} catch (error) {
    res.status(500).json({ success: false, message: 'Update failed', error: error.message });
}
  
}

module.exports = { createOrder,getOrders,updateorderstatus};