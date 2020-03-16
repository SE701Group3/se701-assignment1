import React from 'react';
import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';

export default () => {
  return (
    <div>
      <PostDetail />
      <Comment />
      <CreateCommentModal />
    </div>
  );
};
