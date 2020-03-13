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
    name: req.body.name,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one post
router.patch('/:id', (req, res) => {});

// Deleting one post
router.delete('/:id', (req, res) => {});

module.exports = router;
