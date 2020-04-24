const express = require('express');
const { firebaseAuthMiddleware } = require('../middleware/firebaseAuth');

const router = express.Router();
const Post = require('../db/models/post');
const Comment = require('../db/models/comments');
const User = require('../db/models/users');

// Add one comment
// eslint-disable-next-line no-unused-vars
router.post('/', firebaseAuthMiddleware, async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      user = new User({
        email: req.user.email,
        name: req.user.name,
      });
      await user.save();
    }

    const comment = new Comment({
      parentID: req.body.parentID,
      body: req.body.body,
      author: user._id,
    });

    const newComment = await comment.save();

    if (user.email == null){
      res.status(403).json({ message: 'You have to be logged in to post a comment'});
    } else{
      // update post and comment to include child
      await Post.update({ _id: req.body.parentID }, { $push: { children: newComment._id } });
      await Comment.update({ _id: req.body.parentID }, { $push: { children: newComment._id } });
      // update user to include comment
      await User.update({ _id: user._id }, { $push: { comments: comment._id } });
      res.status(201).send();      
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single comment
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });

    if (!comment) {
      res.status(404).json({ message: 'This comment does not exist' });
      return;
    }

    res.status(201).send(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one comment
// eslint-disable-next-line no-unused-vars
router.put('/:id', firebaseAuthMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
    });
    const user = await User.findOne({
      _id: comment.author,
    });
    if (req.body.commentBody == null) {
      res.status(400).json({ message: 'Please include a body to update this comment' });
    } else if (user.email !== req.user.email) {
      res.status(403).json({ message: 'This comment can only be updated by its original author' });
    } else {
      await Comment.update({ _id: req.params.id }, { body: req.body.commentBody });
      res.status(200).send();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Delete one comment
router.delete('/:id', firebaseAuthMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
    });
    const user = await User.findOne({
      _id: comment.author,
    });

    if (!comment) {
      res.status(404).json({ message: 'Comment not found. Please provide a valid comment ID' });
    } else if (user.email !== req.user.email) {
      res.status(403).json({ message: 'This comment can only be deleted by its original author' });
    } else {
      // Comment can be deleted entirely if it has no children.
      // If it has children, the comment should be kept so that nested structure remains,
      // so comment body is altered instead.
      if (Object.keys(comment.children).length === 0) {
        await Comment.findOneAndDelete({
          _id: comment._id,
        });

        // Update parent to remove this comment as a child
        await Post.update({ _id: comment.parentID }, { $pull: { children: comment._id } });
        await Comment.update({ _id: comment.parentID }, { $pull: { children: comment._id } });
      } else {
        await Comment.update({ _id: comment._id }, { body: '[Comment deleted]' });
      }

      res.status(200).send();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
