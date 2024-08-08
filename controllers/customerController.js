const User = require('../mongo_models/UserSchema');
const getCustomers = async (req, res) => {
    try {
      const customers = await User.find({ role: 'customer' });
      res.render('pages/customers', { customers });
        // res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={getCustomers,deleteCustomer};
  