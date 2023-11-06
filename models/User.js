const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
