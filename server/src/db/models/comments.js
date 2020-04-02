const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema(
  {
    parentID: {
      type: String,
      required: true,
    },
    children: {
      type: Array,
      default: [],
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'date_created' },
  },
);

module.exports = mongoose.model('Comment', commentsSchema);
