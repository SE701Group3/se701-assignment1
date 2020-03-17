import React from 'react';
import PostDetailPageContainer from './PostDetailPageContainer';
// eslint-disable-next-line import/no-named-as-default
import PostDetailPage from './PostDetailPage';

export default () => {
  return (
    <PostDetailPageContainer>
      <PostDetailPage />
    </PostDetailPageContainer>
  );
};
