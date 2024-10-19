const Product = require('../mongo_models/ProductSchema');

const getAllProducts = async (req, res) => { 
    const products = await Product.find({});
    res.render('pages/productspage', { products });

};
const getProductsbyCategory = async (req, res) => {
    const { category } = req.params;
    console.log(category);
    const products = await Product.find({ Product_category: category });
    res.render('pages/productspage', { products });
};
const getProductsforVTO = async (req, res) => {
    const products = await Product.find({});
    const earings = await Product.find({ Product_category: 'earing' });
    const nosepins = await Product.find({ Product_category: 'nosepin' });
    const eyewears = await Product.find({ Product_category: 'eyewear' });
    const noserings = await Product.find({ Product_category: 'nosering' });
    res.render('pages/VirtualTryOn', { earings, nosepins, eyewears, noserings,products });
    // res.json({ products });
};

module.exports = { getAllProducts,getProductsbyCategory ,getProductsforVTO};