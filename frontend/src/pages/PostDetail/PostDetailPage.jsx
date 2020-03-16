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
          <Comment
            title={comment.title}
            content={comment.content}
            key={`${comment.id}-key`}
            upvotes={comment.upvotes_laugh}
            downvotes={comment.upvotes_sad}
            claps={comment.upvotes_clap}
          />
        ))}
      </Container>
      <CreateCommentModal />
    </div>
  );
};

export default PostDetailPage;
