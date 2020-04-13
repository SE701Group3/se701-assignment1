const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
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
  		  type: Number,
  	    default: 0,
  	  },
  	  laughs: {
  		  type: Number,
  	    default: 0,
  	  },
  	  sads: {
  		  type: Number,
  	    default: 0,
  	  }
    },
  },
);

module.exports = mongoose.model('User', userSchema);
