const Product = require('../mongo_models/ProductSchema');

const getProductsforAdmin = async (req, res) => { 
    const products = await Product.find({});
    res.render('pages/productsAdmin', { products });

};
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { getProductsforAdmin,deleteProduct };