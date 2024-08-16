const Order = require('../mongo_models/OrderSchema');
const Product = require('../mongo_models/ProductSchema');
const createOrder = async (req, res) => {
  try {
    const { customerName, products, totalAmount, shippingAddress, method } = req.body;
    const cartId = req.cookies.cartId;
    if (!cartId) {
      return res.status(400).json({ message: 'Cart not found' });
    }
    const newOrder = new Order({ customerName, cartId, products, totalAmount, shippingAddress, method });
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
const getDashboardData = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const week = new Date(today);
    week.setDate(today.getDate() - 7);
    const month = new Date(today);
    month.setDate(today.getDate() - 30);
    const year = new Date(today);
    year.setDate(today.getDate() - 365);
    // Fetch today's orders
    const todayOrders = await Order.find({ createdAt: { $gte: today } });
    
    // Fetch yesterday's orders
    const yesterdayOrders = await Order.find({
      createdAt: {
        $gte: yesterday,
        $lt: today
      }
    });
    const weekOrders = await Order.find({
      createdAt: {
        $gte: week,
        $lt: today
      }
    });
    const monthOrders = await Order.find({
      createdAt: {
        $gte: month,
        $lt: today

      }
    });
    const yearOrders = await Order.find({
      createdAt: {
        $gte: year,
        $lt: today
      }
    });
    
    const allOrders = (await Order.find({})).length;
    const pending = (await Order.find({ status: 'pending' })).length;
    const processing = (await Order.find({ status: 'processing' })).length;
    const delivered = (await Order.find({ status: 'delivered' })).length;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weeklySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: weekStart, $lt: today }
        }
      },
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt" // Group by day of the week (1 = Sunday, 7 = Saturday)
          },
          totalSales: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Initialize an array to store sales data for each day of the week
    const salesData = Array(7).fill(0);
    weeklySales.forEach(order => {
      salesData[order._id - 1] = order.totalSales;
    });
    console.log('sales',salesData);
    const products = await Order.aggregate([
      { $unwind: "$products" }, // Unwind the items array in each order
      { $group: { 
          _id: "$products.productId", // Group by product ID
          totalSales: { $sum: "$products.quantity" } // Sum quantities sold
      }},
      { $sort: { totalSales: -1 } } // Sort by total sales in descending order
    ]);
    // console.log("Product IDs: ", products.map(p => p._id));
    
    // Format data for the pie chart
    const productIds = products.map(p => p._id);
    // const productIds = products.map(p => mongoose.Types.ObjectId(p._id));
    console.log("Product IDs: ", productIds);
    const productDetails = await Product.find({ _id: { $in: productIds } });
    console.log("Product Details: ", productDetails);
    const productNames = productDetails.map(pd => pd.Product_name);
    const productSalesData = products.map(p => p.totalSales);
    console.log('prodName: ',productNames);
    console.log('prodSale',productSalesData);

    res.render('pages/dashboard', { todayOrders, yesterdayOrders,weekOrders,monthOrders,yearOrders,allOrders,pending,processing,delivered,weeklySales:salesData,productNames:productNames,productSalesData:productSalesData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};


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



module.exports = { createOrder, getOrders, updateorderstatus, getDashboardData };