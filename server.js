const express = require('express');
const path = require('path');
const session = require('client-sessions');
const keys = require('./config/devKeys');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  res.render('index', { token: req.session.token });
});

// Routes - Authentication

// GET /signup - DELETE THIS ROUTE
app.get('/signup', (req, res) => {
  res.render('signup');
});

// POST /signup - DELETE THIS ROUTE
app.post('/signup', (req, res) => {

  var myData = new User({
    password: 'password'
    // token: 'token'
  });
  myData.save()
  // user = User.find( {} )
  // console.log(user.password)
  console.log("My data");
  console.log(myData);
});

// GET /login
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login {password} - SPIKED
app.post('/login', (req, res) => {
  // Query for user
  User.findById(keys.userIdSecret, (err, user) => {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        // console.log("Password don't match");
        throw err;
      }

      // console.log(req.body.password, isMatch);

      if(isMatch){
        req.session.token = user.password // Security problem
        // console.log(req.session);
        res.redirect('/');
      } else {
        // console.log('Invalid credentials');
        res.redirect('/login');
      }

    });
  });
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
