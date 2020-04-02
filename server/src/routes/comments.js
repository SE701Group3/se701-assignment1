const express = require('express');

const router = express.Router();
const Post = require('../db/models/post');
const Comment = require('../db/models/comments');

// Add one comment
// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res) => {
  const comment = new Comment({
    parentID: req.body.parentID,
    body: req.body.body,
  });
  try {
    const newComment = await comment.save();

    // update post and comment to include child
    await Post.update({ _id: req.body.parentID }, { $push: { children: newComment._id } });
    await Comment.update({ _id: req.body.parentID }, { $push: { children: newComment._id } });
    res.status(201).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
