const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  posts: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  votes: {
    claps: {
      type: Array,
      default: [],
    },
    laughs: {
      type: Array,
      default: [],
    },
    sads: {
      type: Array,
      default: [],
    },
  },
});

module.exports = mongoose.model('User', userSchema);
