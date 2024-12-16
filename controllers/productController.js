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
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).send('We are sorry. We cannot offer quick view at this time.');
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).render('pages/error', { message: 'Product not found.' });
        }

        res.render('pages/Quickviewpage', { product });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error.');
    }
};   

module.exports = { getAllProducts,getProductsbyCategory ,getProductsforVTO,getProductById};