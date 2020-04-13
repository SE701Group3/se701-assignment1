const mongoose = require('mongoose');

const subThreadsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    posts: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: { createdAt: 'date_created' },
  },
);

module.exports = mongoose.model('SubThread', subThreadsSchema);
