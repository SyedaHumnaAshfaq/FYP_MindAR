const mongoose  = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Product_name: { type: String, required: true },
    Product_price: { type: mongoose.Types.Decimal128, required: true },
    Product_image_url: { type: String, required: true },
    Product_description: { type: String, required: true },
    Product_category: { type: String, required: true },
    Product_stock: { type: Number, required: true },
    Product_rating: { type: Number, required: true },
    product_model_url : { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;