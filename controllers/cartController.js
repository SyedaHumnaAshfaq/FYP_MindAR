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
        return res.render('cart', { cartItems: [] }); // Render empty cart if no cartId
    }

    try {
        const cart = await Cart.findOne({ cartId: cartId });
        if (!cart) {
            return res.render('cart', { cartItems: [] }); // Render empty cart if no cart found
        }
        return res.render('pages/addtocart', { cartItems: cart.items });
        // res.status(200).json(cart);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error getting cart items');
    }
}
module.exports = {addItemToCart, getCartItems};