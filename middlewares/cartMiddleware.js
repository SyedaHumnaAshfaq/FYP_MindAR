const { v4: uuidv4 } = require('uuid');

// Middleware to assign a cart ID if not present
const assignCartId = (req, res, next) => {
    if (!req.cookies.cartId) {
        const cartId = uuidv4(); // Generate a unique cart ID
        res.cookie('cartId', cartId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // Set cookie for 24 hours
    }
    next();
};

module.exports = { assignCartId };
