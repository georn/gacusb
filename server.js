const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Database connection
require('./services/mongoose');

// Set the views folder and the view engine
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.send('Login');
});

// Server listener
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;
