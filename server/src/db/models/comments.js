const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', commentsSchema);
