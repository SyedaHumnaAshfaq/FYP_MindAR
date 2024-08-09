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
const { isAdmin,isAuthenticated } = require('./middlewares/authAdminMiddleware');

connectDB();

app.set('view engine', 'ejs');
app.use('/models', express.static(path.join(__dirname, 'models')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
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
// Set the path to your views directory
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('pages/AdornHomePage'); // Render the homepage.ejs file in the pages folder
});

app.get('/quickview', (req, res) => {
  res.render('pages/quickview.ejs'); // Render the homepage.ejs file in the pages folder
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

app.get('/SignUp', (req, res) => {
  res.render('pages/SignUp'); // Render the homepage.ejs file in the pages folder
});

app.get('/login', (req, res) => {
  res.render('pages/login'); // Render the homepage.ejs file in the pages folder
});

app.get('/VirtualTryOn', (req, res) => { 
    res.render('pages/VirtualTryOn'); // Render the about.ejs file in the pages folder
});
app.get('/adminHomePage', (req, res) => { 
  res.render('pages/adminHomePage'); // Render the about.ejs file in the pages folder
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
