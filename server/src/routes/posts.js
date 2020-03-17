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
router.delete('/:id', (req, res) => {
  // TODO
});

// Commenting once
// eslint-disable-next-line no-unused-vars
router.comment('/', async (req, res) => {
  // TODO
});

module.exports = router;
