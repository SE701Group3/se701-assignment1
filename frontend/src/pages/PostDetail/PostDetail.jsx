import React from 'react';
import { Container } from '@material-ui/core';
import Post from '../Frontpage/Post';

const PostDetail = ({ postToDisplay }) => {
  return (
    <Container width="sm">
      <Post
        title={postToDisplay.title}
        content={postToDisplay.content}
        key={`${postToDisplay.id}-key`}
        upvotes={postToDisplay.upvotes_laugh}
        downvotes={postToDisplay.upvotes_sad}
        claps={postToDisplay.upvotes_clap}
      />
    </Container>
  );
};

export default PostDetail;
