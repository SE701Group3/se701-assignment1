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

// Get one post (detailed)
// eslint-disable-next-line no-unused-vars
router.get('/:id', async (req, res) => {
  try {
    const foundPost = await Post.findOne({ _id: req.params.id });
    const postData = {
      _id: foundPost._id,
      title: foundPost.title,
      body: foundPost.body,
      upvotes_clap: foundPost.upvotes_clap,
      upvotes_laugh: foundPost.upvotes_laugh,
      upvotes_sad: foundPost.upvotes_sad,
      date_created: foundPost.createdAt,
      comments: await Comment.find({ _id: { $in: foundPost.comment_id } }),
    };

    res.send(postData);
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
    children_id: req.body.children_id,
    body: req.body.body,
  });
  try {
    const newComment = await comment.save();

    await Post.update({ _id: req.params.id }, { $push: { comment_id: newComment._id } });
    res.status(201).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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
