const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  favorites: [String],
  portfolio: [{
    symbol: String,
    amount: Number
  }]
})

module.exports = mongoose.model('User', userSchema);