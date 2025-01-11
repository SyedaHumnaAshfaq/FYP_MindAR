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
    const { Product_name, Product_price, Product_description, Product_category, Product_stock } = req.body;
    const Product_image_url = await uploadToS3(req.files['Product_image'][0], 'images');
    const Product_model_url = await uploadToS3(req.files['Product_model_file'][0], 'models');

    try {
        const newProduct = new Product({ Product_name, Product_price, Product_image_url, Product_description, Product_category, Product_stock,  Product_model_url});
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
    // console.log(productId);
    // console.log(req.body);

    console.log('we are entering the controller');
    try {
        if (typeof req.body.is_Published === 'string') {
            req.body.is_Published = req.body.is_Published === 'on';
        }

        // Handle file upload if new files are provided
        let Product_image_url;
        let Product_model_url;

        // Check if files are uploaded and handle them accordingly
        if (req.files && req.files['Product_image']) {
            Product_image_url = await uploadToS3(req.files['Product_image'][0], 'images');
            console.log("image checked");
        }

        if (req.files && req.files['Product_model_file']) {
            Product_model_url = await uploadToS3(req.files['Product_model_file'][0], 'models');
        }

        // If image or model URL exists, update the respective field
        if (Product_image_url) {
            req.body.Product_image_url = Product_image_url;
        }

        if (Product_model_url) {
            req.body.Product_model_url = Product_model_url;
        }

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );
        // console.log(updatedProduct);

        // If the product is not found
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Return the updated product in the response
        res.json({ success: true, product: updatedProduct });

    } catch (error) {
        // Log the error to the console and return a 500 Internal Server Error
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// const updateProduct = async (req, res) => {
//     const { productId } = req.params.id; // Assuming product ID is passed as a route parameter
//     const { Product_name, Product_price, Product_description, Product_category, Product_stock } = req.body;

//     try {
//         // Find the product to update
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Initialize variables for the updated URLs
//         let Product_image_url = product.Product_image_url; // Retain existing image URL
//         let Product_model_url = product.Product_model_url; // Retain existing model URL

//         // Check if a new image file is uploaded
//         if (req.files && req.files['Product_image']) {
//             Product_image_url = await uploadToS3(req.files['Product_image'][0], 'images');
//         }

//         // Check if a new model file is uploaded
//         if (req.files && req.files['Product_model_file']) {
//             Product_model_url = await uploadToS3(req.files['Product_model_file'][0], 'models');
//         }

//         // Update the product details
//         product.Product_name = Product_name || product.Product_name;
//         product.Product_price = Product_price || product.Product_price;
//         product.Product_description = Product_description || product.Product_description;
//         product.Product_category = Product_category || product.Product_category;
//         product.Product_stock = Product_stock || product.Product_stock;
//         product.Product_image_url = Product_image_url;
//         product.Product_model_url = Product_model_url;

//         // Save the updated product
//         await product.save();

//         res.json({ success: true, updatedProduct: product });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
const getRefreshedProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
 };

module.exports = { getProductsforAdmin, deleteProduct, updatePublishStatus, addProduct, getProductById,updateProduct,getRefreshedProducts };