const mongoose  = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Product_name: { type: String, required: true },
    Product_price: { type: mongoose.Types.Decimal128, required: true },
    Product_image_url: { type: String, required: true },
    Product_description: { type: String, required: true },
    Product_category: { type: String, required: true },
    Product_stock: { type: Number, required: true },
    Product_model_url: { type: String, required: true },
    model_rotation_left: { 
        type: Object, 
        default: { x: 0, y: -15, z: 0 } 
    },
    model_position_left: { 
        type: Object, 
        default: { x: -0.02, y: -0.43, z: -0.1 } 
    },
    model_rotation_right: { 
        type: Object, 
        default: { x: 0, y: 15, z: 0 } 
    },
    model_position_right: { 
        type: Object, 
        default: { x: 0.02, y: -0.43, z: -0.1 } 
    },
    model_scale: { 
        type: Object, 
        default: { x: 1, y: 1, z: 1 } 
    },
    model_rotation_glasses: {
        type: Object, 
        default: { x: 0, y: 90 } 
    },
    model_position_glasses: {
        type: Object, 
        default: { x: -0.06, y: -0.12, z: -0.0005 }
    },
    model_rotation_nosepin: {
        type: Object, 
        default: { x: 0, y: 0,z: 0 } 
    },
    model_position_nosepin: {
        type: Object, 
        default: { x: 0.07, y: 0.04, z: -0.1 }
    },

    is_Published: { type: Boolean, required: true, default:false },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;