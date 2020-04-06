import React from 'react';
import { Container } from '@material-ui/core';
import Post from '../Frontpage/Post';

const PostDetail = ({ postToDisplay, handleVote, getPostInformationOnLoad }) => {
  return (
    <Container width="sm">
      <Post
        id={postToDisplay._id}
        title={postToDisplay.title}
        content={postToDisplay.body}
        key={`${postToDisplay.id}-key`}
        upvotes={postToDisplay.upvotes_laugh}
        downvotes={postToDisplay.upvotes_sad}
        claps={postToDisplay.upvotes_clap}
        handleVote={handleVote}
        frontpage={false}
        loadPost={getPostInformationOnLoad}
      />
    </Container>
  );
};

export default PostDetail;
