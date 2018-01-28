const mongoose = require('mongoose'); // ORM
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR= 10;

// const Schema = mongoose.Schema;  same as line below ES6
const { Schema } = mongoose;

// User Schema - SPIKE
const UserSchema = new Schema({
  password: {
    type: String,
    unique: true,
    required: true,
    minlength: 6
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model('User', UserSchema);
