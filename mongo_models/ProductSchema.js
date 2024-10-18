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
        x: { type: Number, default: 0 }, 
        y: { type: Number, default: 0 }, 
        z: { type: Number, default: 0 }
    },
    model_position_left: { 
        x: { type: Number, default: 0 }, 
        y: { type: Number, default: 0 }, 
        z: { type: Number, default: 0 }
    },
    model_rotation_right: { 
        x: { type: Number, default: 0 }, 
        y: { type: Number, default: 0 }, 
        z: { type: Number, default: 0 }
    },
    model_position_right: { 
        x: { type: Number, default: 0 }, 
        y: { type: Number, default: 0 }, 
        z: { type: Number, default: 0 }
    },
    model_scale: { 
        x: { type: Number, default: 1 }, 
        y: { type: Number, default: 1 }, 
        z: { type: Number, default: 1 }
    },

    is_Published: { type: Boolean, required: true, default:false },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;