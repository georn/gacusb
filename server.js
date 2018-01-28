const express = require('express');
const path = require('path');
const session = require('client-sessions');
const keys = require('./config/devKeys');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Remote database connection - SPIKED
require('./models/User')
require('./services/mongoose');
const User = mongoose.model('User');


// bodyParser needed Middleware Configuration for persisting session
app.use(bodyParser.urlencoded({ extended: true }));

// client-session Middleware -
app.use(
  session({
    cookieName: 'session',
    secret: keys.sessionSecret,
    durantion: 24 * 60 * 60 * 1000 // A day in Miliseconds
  })
);

// Set the views folder '/views' and the view engine to 'ejs' - Middleware
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// Route - HOME
// GET /
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// Routes - Authentication
// GET /login
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login {password} - SPIKED
app.post('/login', (req, res) => {
  // Query for user
  user = User.find( {} )
  console.log(user.schema)

  // if(user.comparePassword(req.body.password)) {
  //   res.redirect('/');
  // } else {
  //   console.log('Invalid user credentials'); // Passwords don't match
  // }
});

// POST /logout - SPIKED
app.post('/logout', (req, res) => {
  req.session.reset(); // Reseting session
  res.redirect('/');
});

// Server listener
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;
