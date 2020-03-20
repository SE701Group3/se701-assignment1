import React from 'react';
import PostDetailPageContainer from './PostDetailPageContainer';
// eslint-disable-next-line import/no-named-as-default
import PostDetailPage from './PostDetailPage';

// This component is what is rendered for the individual posts route
//
// The PostDetailPage container contains the the logic and state for the page itself.
// It also handles any data retrived from the backend through the service layer.
export default () => {
  return (
    <PostDetailPageContainer>
      <PostDetailPage />
    </PostDetailPageContainer>
  );
};
