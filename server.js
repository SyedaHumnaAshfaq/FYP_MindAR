const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

connectDB();

app.set('view engine', 'ejs');
app.use('/models', express.static(path.join(__dirname, 'models')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', userRoutes);
app.use('/', productRoutes);

// Set the path to your views directory
app.set('views', path.join(__dirname, 'views'));

// Define route to render the homepage
app.get('/', (req, res) => {
  res.render('pages/Home'); // Render the homepage.ejs file in the pages folder
});

app.get('/quickview', (req, res) => {
  res.render('pages/quickview.ejs'); // Render the homepage.ejs file in the pages folder
});

app.get('/SignUp', (req, res) => {
  res.render('pages/SignUp'); // Render the homepage.ejs file in the pages folder
});

app.get('/loginpage', (req, res) => {
  res.render('pages/login'); // Render the homepage.ejs file in the pages folder
});

app.get('/VirtualTryOn', (req, res) => { 
    res.render('pages/VirtualTryOn'); // Render the about.ejs file in the pages folder
});
app.get('/addtocart', (req, res) => { 
  res.render('pages/addtocart'); // Render the about.ejs file in the pages folder
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
