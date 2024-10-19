const mongoose  = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Product_name: { type: String, required: true },
    Product_price: { type: mongoose.Types.Decimal128, required: true },
    Product_image_url: { type: String, required: true },
    Product_description: { type: String, required: true },
    Product_category: { type: String, required: true },
    Product_stock: { type: Number, required: true },
    Product_rating: { type: Number, required: true },
    Product_model_url: { type: String, required: true },
    model_rotation_left: { 
        type: Object, 
        default: { x: 0, y: 0, z: 0 } 
    },
    model_position_left: { 
        type: Object, 
        default: { x: 0, y: 0, z: 0 } 
    },
    model_rotation_right: { 
        type: Object, 
        default: { x: 0, y: 0, z: 0 } 
    },
    model_position_right: { 
        type: Object, 
        default: { x: 0, y: 0, z: 0 } 
    },
    model_scale: { 
        type: Object, 
        default: { x: 1, y: 1, z: 1 } 
    },
    model_rotation_glasses: {
        type: Object, 
        default: { x: 0, y: 0 } 
    },

    is_Published: { type: Boolean, required: true, default:false },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;