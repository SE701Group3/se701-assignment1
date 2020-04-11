const express = require('express');

const router = express.Router();
const SubThread = require('../db/models/subThreads');

// Initialise table with pre-defined subThreads until the add endpoint is connected.
const initialisePromises = [
  'SubThread1',
  'SubThread2',
  'SubThread3',
  'SubThread4',
  'SubThread5',
].map(subThread => {
  return SubThread.updateOne(
    { title: subThread },
    { $setOnInsert: { title: subThread, posts: [] } },
    { upsert: true },
  );
});
Promise.all(initialisePromises).catch();

// Get a list of all subThreads
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res) => {
  const subThreads = await SubThread.find({}, { title: 1 });
  res.status(201).json(subThreads);
});

module.exports = router;
