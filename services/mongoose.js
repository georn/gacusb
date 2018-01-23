const mongoose = require('mongoose');
const keys = require('../config/keys')

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {})
  .then( function() {
    console.log('MongoDB Connected...');
  })
  .catch( function(err) {
    console.log(err);
});
