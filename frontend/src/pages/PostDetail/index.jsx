import React from 'react';
import { Container } from '@material-ui/core';
import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';

export default () => {
  return (
    <div>
      <PostDetail />
      <Container maxWidth="sm">
        <Comment />
      </Container>
      <CreateCommentModal />
    </div>
  );
};
