
const express = require('express');

const router = express.Router();
const User = require('../db/models/users');

// Initialise table with pre-defined users until the add endpoint is connected.
const initialisePromises = [
  'User1@gmail.com',
  'User2@gmail.com',
  'User3@gmail.com',
  'User4@gmail.com',
  'User5@gmail.com',
].map(email => {
  return User.updateOne(
    { email: email },
    { $setOnInsert: { email: email } },
    { upsert: true },
  );
});
Promise.all(initialisePromises).catch();

module.exports = router;
