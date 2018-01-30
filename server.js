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
  res.render('index', { dummyPassword: req.session.dummyPassword });
});

// Routes - Authentication

// GET /signup
app.get('/signup', (req, res) => {
  res.render('signup');
});

// POST /signup
app.post('/signup', (req, res) => {

  var myData = new User({
    password: 'password'
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
  User.findById('5a6e43196575394836cd45f6', (err, user) => {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        console.log("Password don't match");
      }
      console.log(req.body.password, isMatch);

      if(isMatch){
        req.session.dummyPassword = user.password
        console.log('===NEW SESSION IF PASSWORD ARE THE SAME====');
        console.log(req.session);
        console.log('===END OF SESSION IF PASSWORD ARE THE SAME====');
        res.redirect('/');
      } else {
        console.log('Invalid credentials');
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
