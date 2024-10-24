const Cart = require('../mongo_models/CartSchema');

const addItemToCart = async(req,res)=>{
    const { cartId } = req.cookies; // Retrieve cartId from cookies
    const { productId, productName, productPrice, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { cartId: cartId, 'items.productId': productId },
            { $inc: { 'items.$.quantity': quantity } }, // Increment quantity if item already in cart
            { new: true }
        );

        if (cart) {
            return res.status(200).json(cart);
        }

        const newCart = await Cart.findOneAndUpdate(
            { cartId: cartId },
            {
                $push: {
                    items: {
                        productId: productId,
                        productName: productName,
                        productPrice: productPrice,
                        quantity: quantity
                    }
                }
            },
            { new: true, upsert: true }
        );
        res.redirect('/addtocart');

        // res.status(200).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding item to cart');
    }
};
const getCartItems = async (req, res) => {
    
    const { cartId } = req.cookies;
    if (!cartId) {
        return res.render('pages/addtocart', { cartItems: [] ,grandTotal:0 }); // Render empty cart if no cartId
    }

    try {
        const cart = await Cart.findOne({ cartId: cartId });
        if (!cart) {
            return res.render('pages/addtocart', { cartItems: [],grandTotal:0 }); // Render empty cart if no cart found
        }
        const grandTotal = cart.items.reduce((total, item) => total + item.productPrice * item.quantity, 0);

        return res.render('pages/addtocart', { cartItems: cart.items,grandTotal:grandTotal });
        // res.status(200).json(cart);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error getting cart items');
    }
}
const updateQuantity = async (req, res) => { 
    const { cartId } = req.cookies;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { cartId: cartId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).send('Item not found in cart');
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating quantity');
    }
};
const deleteCartItem = async (req, res) => {
    const { cartId } = req.cookies;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { cartId: cartId },
            { $pull: { items: { productId: productId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).send('Item not found in cart');
        }
        const cartItems = cart.items;
        const grandTotal = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

        res.status(200).json({ cartItems, grandTotal });

        // res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting item from cart');
    }
};
module.exports = {addItemToCart, getCartItems, updateQuantity,deleteCartItem};