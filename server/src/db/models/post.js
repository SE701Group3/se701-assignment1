const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    upvotes_clap: {
      type: Number,
      default: 0,
    },
    upvotes_laugh: {
      type: Number,
      default: 0,
    },
    upvotes_sad: {
      type: Number,
      default: 0,
    },
    comment_id: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', postSchema);
