const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.set('view engine', 'ejs');
app.use('/models', express.static(path.join(__dirname, 'models')));

app.use(express.static(path.join(__dirname, 'public')));
// Set the path to your views directory
app.set('views', path.join(__dirname, 'views'));

// Define route to render the homepage
app.get('/', (req, res) => {
  res.render('pages/Home.ejs'); // Render the homepage.ejs file in the pages folder
});
app.get('/products', (req, res) => {
  res.render('pages/products'); // Render the homepage.ejs file in the pages folder
});
app.get('/VirtualTryOn', (req, res) => { 
    res.render('pages/VirtualTryOn'); // Render the about.ejs file in the pages folder
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
