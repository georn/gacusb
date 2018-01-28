const mongoose = require('mongoose'); // ORM

// {
//   username: 'admin',
//     password: 'giwwenfondoadqwcqwdgre',
//       tokens: [{
//         access: 'auth',
//         token: 'fnqojnjoakmlfnoqcasmkfnqokw'
//       }]
// }

// const Schema = mongoose.Schema;  same as line below ES6
const { Schema } = mongoose;

// User Schema - SPIKE
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 5
  },
  password: {
    type: String,
    unique: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

mongoose.model('users', userSchema);
