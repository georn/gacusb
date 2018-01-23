const mongoose = require('mongoose');

// const Schema = mongoose.Schema;  same as line below
const { Schema } = mongoose;
// comment
const userSchema = new Schema({
  usersname: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  }
});

mongoose.model('users', userSchema);
