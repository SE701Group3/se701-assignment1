import React from 'react';
import { Container } from '@material-ui/core';
import Post from '../Frontpage/Post';

const PostDetail = ({ postToDisplay, handleVote }) => {
  return (
    <Container width="sm">
      <Post
        id={postToDisplay.id}
        title={postToDisplay.title}
        content={postToDisplay.content}
        key={`${postToDisplay.id}-key`}
        upvotes={postToDisplay.upvotes_laugh}
        downvotes={postToDisplay.upvotes_sad}
        claps={postToDisplay.upvotes_clap}
        handleVote={handleVote}
      />
    </Container>
  );
};

export default PostDetail;
