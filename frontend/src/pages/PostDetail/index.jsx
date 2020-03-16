import React from 'react';
import PostDetail from './PostDetail';
import CommentsContainer from './CommentsContainer';
import CreateCommentModal from './CreateCommentModal';

export default () => {
  return (
    <div>
      <PostDetail />
      <CommentsContainer />
      <CreateCommentModal />
    </div>
  );
};
