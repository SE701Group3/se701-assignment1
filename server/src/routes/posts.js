const express = require('express');
const { firebaseAuthMiddleware } = require('../middleware/firebaseAuth');

const router = express.Router();
const User = require('../db/models/users');
const Post = require('../db/models/post');
const Comment = require('../db/models/comments');
const SubThread = require('../db/models/subThreads');

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
router.post('/', firebaseAuthMiddleware, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email });

    if (user == null) {
      const user = new User({
        email: req.user.email,
      });
      await user.save();
    }

    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      author: user._id,
      sub_thread: req.body.subthread,
    });

    const newPost = await post.save();
    await User.update({ _id: user._id }, { $push: { posts: newPost._id } });
    await SubThread.update({ title: req.body.subthread }, { $push: { posts: newPost._id } });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one post
// eslint-disable-next-line no-unused-vars
router.put('/:id', firebaseAuthMiddleware, async (req, res) => {
  const currentPost = await Post.findById(req.params.id);
  const user = await User.findById(currentPost.author);
  if (user.email === req.user.email) {
    try {
      if (req.body.title != null && req.body.body != null) {
        await Post.update({ _id: req.params.id }, { title: req.body.title, body: req.body.body });
        res.status(200).send();
      } else {
        res.status(400).json({ message: 'Please include a title and body' });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'You must be the author to update this post' });
  }
});

// Get nested comments
const getNestedComments = async childrenIDs => {
  const comments = await Comment.find({ _id: { $in: childrenIDs } });
  for (let i = 0; i < comments.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    comments[i].children = await getNestedComments(comments[i].children);
  }
  return comments;
};

// Get one post (detailed)
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
      date_created: foundPost.date_created,
      comments: await getNestedComments(foundPost.children),
    };

    res.send(postData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Deleting one post
// eslint-disable-next-line no-unused-vars
router.delete('/:id', firebaseAuthMiddleware, async (req, res) => {
  const currentPost = await Post.findById(req.params.id);
  const user = await User.findById(currentPost.author);

  if (user.email === req.user.email) {
    try {
      await Post.findOneAndDelete({
        _id: req.params.id,
      });
      res.status(200).send();
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'You must be the author to delete this post' });
  }
});

// Upvote a post
router.put('/:id/upvote', firebaseAuthMiddleware, async (req, res) => {
  const currentPost = await Post.findById(req.body.id);

  try {
    if (req.body.upvote_type === 'clap') {
      const claps = currentPost.upvotes_clap;

      await Post.updateOne(
        { _id: req.body.id },
        { upvotes_clap: claps + (req.body.upvote === true ? 1 : -1) },
      );

      const returnPost = await Post.findById(req.body.id);
      res.status(200).json(returnPost);
    } else if (req.body.upvote_type === 'laugh') {
      const laughs = currentPost.upvotes_laugh;

      await Post.update(
        { _id: req.body.id },
        { upvotes_laugh: laughs + (req.body.upvote === true ? 1 : -1) },
      );

      const returnPost = await Post.findById(req.body.id);
      res.status(200).json(returnPost);
    } else if (req.body.upvote_type === 'sad') {
      const sads = currentPost.upvotes_sad;

      await Post.update(
        { _id: req.body.id },
        { upvotes_sad: sads + (req.body.upvote === true ? 1 : -1) },
      );

      const returnPost = await Post.findById(req.body.id);
      res.status(200).json(returnPost);
    } else res.status(400).json({ message: 'Invalid upvote type' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts that belong to a specific subThread
router.get('/subThread/:subThreadTitle', async (req, res) => {
  try {
    const foundSubThread = await SubThread.findOne({ title: req.params.subThreadTitle });
    if (!foundSubThread) {
      res.status(404).json({ message: 'This subThread does not exist' });
      return;
    }
    const posts = await Post.find({ _id: { $in: foundSubThread.posts } });
    res.send(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
