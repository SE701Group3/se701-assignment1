const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    posts: {
      type: Array,
      default: [],
      required: true,
    },
    comments: {
      type: Array,
      default: [],
      required: true,
    },
    votes: {
  	  claps: {
  		  type: Array,
  	    default: [],
        required: true,
  	  },
  	  laughs: {
  		  type: Array,
  	    default: [],
        required: true,
  	  },
  	  sads: {
  		  type: Array,
  	    default: [],
        required: true,
  	  }
    },
  },
);

module.exports = mongoose.model('User', userSchema);
