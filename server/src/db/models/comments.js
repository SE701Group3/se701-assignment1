const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  comment_id: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentsSchema);
