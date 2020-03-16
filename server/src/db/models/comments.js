const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  parent_id: {
    type: Number,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('comment', commentsSchema);
