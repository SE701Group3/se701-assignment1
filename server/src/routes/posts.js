const express = require('express');

const router = express.Router();
const Post = require('../db/models/post');
const Comment = require('../db/models/comments');

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
router.put('/:id', async (req, res) => {
  try {
    await Post.update({ _id: req.params.id }, { title: req.body.title, body: req.body.body });
    res.status(200).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Deleting one post
// eslint-disable-next-line no-unused-vars
router.delete('/:id', async (req, res) => {
  try {
    await Post.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Commenting once and updating post schema with comment id
// eslint-disable-next-line no-unused-vars
router.post('/:id/comment', async (req, res) => {
  const comment = new Comment({
    comment_id: req.body.comment_id,
    body: req.body.body,
  });
  
  try {
    // TODO
    const newComment = await comment.save();
    res.status(201).json(newComment);

    await Post.update({ _id: req.params.id }, { $push: { comment_id: newComment._id } });
    res.status(200).send();
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
