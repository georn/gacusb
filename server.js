const express = require('express');
const path = require('path');
const _ = require('lodash');

const app = express();
const PORT = 3000;

// Database connection - SPIKE
require('./services/mongoose');

// Set the views folder and the view engine - Middleware
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

// Routes - Authentication
// GET /login
app.get('/login', (req, res) => {
  res.send('Login');
});

// POST /login {username, password} - SPIKED
app.post('/login', (req, res) => {
  // console.log('calling');
  // let dummy = {"hello": "hello"};
  let body = _.pick(req.body, ['username', 'password']);

  res.send(body);
});

// Server listener
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;
