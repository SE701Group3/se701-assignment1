const express = require('express');

const router = express.Router();
const Post = require('../db/models/post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one post
// eslint-disable-next-line no-unused-vars
router.patch('/:id', (req, res) => {
  // TODO
});

// Deleting one post
// eslint-disable-next-line no-unused-vars
router.delete('/:id', async (req, res) => {
  try {
    await Post.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: 'ok' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
