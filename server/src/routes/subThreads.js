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

// Create a new subThread
router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Please include a title' });
    return;
  }

  try {
    const existingSubThread = await SubThread.find({ title }).limit(1);
    if (existingSubThread && Array.isArray(existingSubThread) && existingSubThread.length > 0) {
      res.status(400).json({ message: 'This subThread already exists' });
      return;
    }

    const subThread = new SubThread({
      title,
    });

    const newSubThread = await subThread.save();
    res.status(201).send(newSubThread);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a list of all subThreads
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res) => {
  const subThreads = await SubThread.find({}, { title: 1 });
  res.status(201).json(subThreads);
});

module.exports = router;
