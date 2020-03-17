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

// Upvote a post
router.put('/:id/upvote', async (req, res) => {
  const currentPost = await Post.findById(req.body.id);

  try {
    if (req.body.upvote_type === 'clap') {
      const claps = currentPost.upvotes_clap;
      await Post.updateOne(
        { _id: req.body.id },
        { upvotes_clap: claps + (req.body.upvote === true ? 1 : -1) },
      );
    } else if (req.body.upvote_type === 'laugh') {
      const laughs = currentPost.upvotes_laugh;
      await Post.update(
        { _id: req.body.id },
        { upvotes_laugh: laughs + (req.body.upvote === true ? 1 : -1) },
      );
    } else if (req.body.upvote_type === 'sad') {
      const sads = currentPost.upvotes_sad;
      await Post.update(
        { _id: req.body.id },
        { upvotes_sad: sads + (req.body.upvote === true ? 1 : -1) },
      );
    } else res.status(400).json({ message: 'Invalid upvote type' });

    res.status(200).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
