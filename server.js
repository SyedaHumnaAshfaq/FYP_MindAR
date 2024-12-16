const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cookieParser = require('cookie-parser');
const { assignCartId } = require('./middlewares/cartMiddleware');
const { isAdmin, isAuthenticated } = require('./middlewares/authAdminMiddleware');
const checkoutRoutes = require('./routes/checkoutRoutes');

const stripe = require("stripe")("sk_test_51QDn2jLIHxgGTNSVNEx5m9t9JEHW42zYz5oiV0ofv20DJHuUmLZjV8ORJYwpSW5DLiDRx9z9rCgOfwVvMLW51lFl00cJrVPs7b");

connectDB();
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.use('/models', express.static(path.join(__dirname, 'models')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(assignCartId);


app.use('/api/auth', userRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoutes);
app.use('/', customerRoutes);
app.use('/', checkoutRoutes); 
// Set the path to your views directory
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('pages/AdornHomePage.ejs'); // Render the homepage.ejs file in the pages folder
});
app.get('/Home', (req, res) => {
  res.render('pages/Home.ejs'); // Render the homepage.ejs file in the pages folder
});

app.get('/quickview', (req, res) => {
  res.render('pages/Quickviewpage.ejs'); // Render the homepage.ejs file in the pages folder
});
app.get('/dashboard', (req, res) => { 
    res.render('pages/dashboard'); // Render the about.ejs file in the pages folder
});
app.get('/customers', (req, res) => { 
  res.render('pages/customers'); // Render the about.ejs file in the pages folder
});
app.get('/orders', (req, res) => { 
  res.render('pages/orders'); // Render the about.ejs file in the pages folder
});
app.get('/trackorder', (req, res) => { 
  res.render('pages/trackorder'); // Render the about.ejs file in the pages folder
});

app.get('/SignUp', (req, res) => {
  res.render('pages/SignUp'); // Render the homepage.ejs file in the pages folder
});

app.get('/login', (req, res) => {
  res.render('pages/login'); // Render the homepage.ejs file in the pages folder
});

app.get('/VirtualTryOn', (req, res) => { 
    res.render('pages/VirtualTryOn'); // Render the about.ejs file in the pages folder
});
app.get('/adminHomePage',isAuthenticated,isAdmin, (req, res) => { 
  res.render('pages/adminHomePage'); // Render the about.ejs file in the pages folder
});
// app.get('/products',isAuthenticated,isAdmin, (req, res) => {
//   res.render('pages/products'); // Render the about.ejs file in the pages folder
// });
app.get('/products', (req, res) => {
  res.render('pages/products'); // Render the about.ejs file in the pages folder
});
app.get('/wishlist', (req, res) => {
  res.render('pages/wishlist'); // Render the about.ejs file in the pages folder
});

app.get('/productsAdmin', (req, res) => {
  res.render('pages/productsAdmin'); // Render the homepage.ejs file in the pages folder
});
// app.get('/products2', (req, res) => {
//   res.render('pages/products2'); // Render the homepage.ejs file in the pages folder
// });

app.get('/favourites', (req, res) => {
  res.render('pages/favourites'); // Render the homepage.ejs file in the pages folder
});
// app.get('/productspage', (req, res) => {
//   res.render('pages/productspage'); // Render the homepage.ejs file in the pages folder
// });
// app.get('/checkoutpage', (req, res) => { // Assuming cart is stored in session
//   res.render('pages/checkoutpage');
// });  
app.get('/VTOAdmin', (req, res) => {
  res.render('pages/VTOAdmin'); // Render the homepage.ejs file in the pages folder
});

app.get('/Aboutus', (req, res) => {
  res.render('pages/Aboutus'); // Render the homepage.ejs file in the pages folder
});
// app.get('/Quickviewpage', (req, res) => {
//   res.render('pages/Quickviewpage'); // Render the homepage.ejs file in the pages folder
// });
app.post('/create-confirm-intent', async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      confirm: true,
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
      confirmation_token: req.body.confirmationTokenId, // the ConfirmationToken ID sent by your client
    });
    res.json({
      client_secret: intent.client_secret,
      status: intent.status
    });
  } catch (err) {
    res.json({
      error: err
    })
  }
});
app.get('/checkoutCOD', (req, res) => {
  res.render('pages/checkoutCOD'); // Render the homepage.ejs file in the pages folder
});
app.get('/checkout', (req, res) => {
  res.render('pages/checkout'); // Render the homepage.ejs file in the pages folder
});
app.get('/order-confirmation', (req, res) => {
  res.render('pages/order-confirmation'); // Render the homepage.ejs file in the pages folder
 });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
