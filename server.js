const express = require('express');
const path = require('path');
const user = require('./models/User.js');
const session = require('client-sessions');
const keys = require('./config/devKeys');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const PORT = 3000;

// Database connection - SPIKE
require('./services/mongoose');

// bodyParser Middleware Config
app.use(bodyParser.urlencoded({ extended: true }));

// Session Middleware - client-session
app.use(
  session({
    cookieName: 'session',
    secret: keys.sessionSecret,
    durantion: 24 * 60 * 60 * 1000 // A day in Miliseconds
  })
);

// Set the views folder and the view engine - Middleware
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log(req.session);
  res.render('index');
});

// Routes - Authentication
// GET /login
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login {username, password} - SPIKED
app.post('/login', (req, res) => {
  // let body = _.pick(req.body, ['username', 'password']);
  // console.log(req.body);

  let user = {
    username: 'dummyUser',
    password: 'password'
  };
  if (req.body.password === user.password) {
    req.session.user = user;
    // res.send(req.session.user);
    res.redirect('/');
  } else {
    console.log('Invalid user credentials');
  }
});

// Server listener
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;
