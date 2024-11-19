const Product = require('../mongo_models/ProductSchema');
const {uploadToS3} = require('../s3');    

const getProductsforAdmin = async (req, res) => {
    const products = await Product.find({});
    // res.json({ products });
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
const updatePublishStatus = async (req, res) => {
    const productId = req.params.id; // Get productId from the URL parameters
    const { isPublished } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { is_Published: isPublished },
            { new: true }
        );

        if (updatedProduct) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Product not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const addProduct = async (req, res) => { 
    const { Product_name, Product_price, Product_description, Product_category, Product_stock, Product_rating } = req.body;
    const Product_image_url = await uploadToS3(req.files['Product_image'][0], 'images');
    const Product_model_url = await uploadToS3(req.files['Product_model_file'][0], 'models');

    try {
        const newProduct = new Product({ Product_name, Product_price, Product_image_url, Product_description, Product_category, Product_stock, Product_rating, Product_model_url});
        await newProduct.save();
        console.log(newProduct._id);
        res.json({ success: true, modelUrl: Product_model_url, product_id: newProduct._id, Product_category: newProduct.Product_category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    

};

const getProductById = async (req, res) => {
    // console.log(req.params.id);
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        res.json({ success: true, product });
        console.log('Product found:', product);  // Log the product details
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    console.log(req.body);

    console.log('we are entering the controller');
    try {
        if (typeof req.body.is_Published === 'string') {
            req.body.is_Published = req.body.is_Published === 'on';
        }
        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );
        console.log(updatedProduct);

        // If the product is not found
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Return the updated product in the response
        res.json({ success: true, product: updatedProduct });
        // console.log('Product updated successfully:', updatedProduct);
    } catch (error) {
        // Log the error to the console and return a 500 Internal Server Error
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

const getRefreshedProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
 };

module.exports = { getProductsforAdmin, deleteProduct, updatePublishStatus, addProduct, getProductById,updateProduct,getRefreshedProducts };