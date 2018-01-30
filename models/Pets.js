const mongoose = require('mongoose');

const { Schema } = mongoose;

const PetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: true
  },
  vaccinated: {
    type: Boolean,
    require: true
  }
});

mongoose.model('Pet', UserSchema);
