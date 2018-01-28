const express = require('express');
const path = require('path');
const user = require('./models/User.js');
const session = require('client-sessions');
const keys = require('./config/devKeys');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Remote database connection - SPIKED
require('./services/mongoose');

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
  console.log(req.session);
  res.render('index', { user: req.session.user });
});

// Routes - Authentication
// GET /login
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login {password} - SPIKED
app.post('/login', (req, res) => {

  // Fake Password for authentication
  let dummyPassword = { 
    password: 'password'
  };

  if (req.body.password === user.password) { // NEXT STEP - Compare with encrypted password in the database
    req.session.user = user; // Saving Cookie for persisting session
    res.redirect('/');
  } else {
    console.log('Invalid user credentials'); // Passwords don't match
  }
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
