const express = require('express');

const router = express.Router();
const User = require('../db/models/users');

// Initialise table with pre-defined users until the add endpoint is implemented
// eslint-disable-next-line func-names
const testUsers = [
  { email: 'user1@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [] },
  { email: 'user2@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [] },
  { email: 'user3@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [] },
  { email: 'user4@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [] },
  { email: 'user5@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [] },
];

// Insert test users if document is empty
// eslint-disable-next-line func-names
User.countDocuments(function(err, count) {
  if (!err && count === 0) {
    // eslint-disable-next-line func-names
    User.insertMany(testUsers, function(err1) {
      if (err1) throw err1;
    });
  }
});

// Create a new user - THIS NEEDS WORK
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Please include an email' });
    return;
  }

  try {
    const user = new User({
      email,
    });

    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
