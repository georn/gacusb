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

  var user = new User();
  console.log("===USER OBJECT===");
  console.log(user);
  console.log("===END OF USER OBJECT===");
  console.log("===PASSWORD FROM FORM===");
  console.log(req.body.password);
  console.log("===END OF PASSWORD FROM FORM===");
  console.log("===ENCRYPTION PASSWORD PROCESS");
  console.log("===GENERATING SALT");

  encryptedPassword = bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log("===SALT GENERATION FAILED===");
      return next(err);
    } else {
      console.log("===SALT GENERATION SUCCESSFUL===");
      // If salt generation was successful then we need to hash it
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          console.log("===HASH PROCESS FAILED");
          return next(err);
        } else {
          user.password = hash
          next();
        }
      });
    }});
    
  console.log(encryptedPassword);
  console.log("===END OF ENCRYPTION PASSWORD PROGRESS===");
  console.log("Maybe? -> " + user.password);

  var myData = new User({
    // password: bcrypt.genSalt(req.body.password),
  });
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
  user = User.find( {} )

  // if(user.comparePassword(req.body.password)) {
  //   res.redirect('/');
  // } else {
  //   console.log('Invalid user credentials'); // Passwords don't match
  // }

  console.log('===SESSION====');
  console.log(req.session);
  console.log('===END OF SESSION====');

  let dummyPassword = {
    password: 'password'
  }

  if(req.body.password == dummyPassword.password) {
    req.session.dummyPassword = dummyPassword; // Saving Cookie for persisting session
    console.log('===NEW SESSION IF PASSWORD ARE THE SAME====');
    console.log(req.session);
    console.log('===END OF SESSION IF PASSWORD ARE THE SAME====');
    res.redirect('/');
  } else {
    console.log('Invalid credentials');
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
