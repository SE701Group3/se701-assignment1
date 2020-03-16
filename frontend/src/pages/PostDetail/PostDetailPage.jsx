import React from 'react';
import { Container } from '@material-ui/core';
import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';

const PostDetailPage = ({ commentsToDisplay }) => {
  return (
    <div>
      <PostDetail />
      <Container maxWidth="sm">
        {commentsToDisplay.map(comment => (
          <Comment body={comment.body} dateCreated={comment.dateCreated} />
        ))}
      </Container>
      <CreateCommentModal />
    </div>
  );
};

export default PostDetailPage;
