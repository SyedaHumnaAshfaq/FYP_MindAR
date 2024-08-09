const Product = require('../mongo_models/ProductSchema');

const getAllProducts = async (req, res) => { 
    const products = await Product.find({});
    res.render('pages/products', { products });
    // res.render('pages/productsAdmin', { products });

    // res.status(200).json(products);


};
const getProductsbyCategory = async (req, res) => {
    const { category } = req.params;
    console.log(category);
    const products = await Product.find({ Product_category: category });
    res.render('pages/products', { products });
};

module.exports = { getAllProducts,getProductsbyCategory };