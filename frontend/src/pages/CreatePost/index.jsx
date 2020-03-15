import React from 'react';
import CreatePostModal from './CreatePostModal';
import withCreatePostService from './withCreatePostService';

const CreatePostModalServiced = withCreatePostService(CreatePostModal);

export default () => {
  return (
    <div>
      <p>asdfasdf</p>
      <CreatePostModalServiced />
    </div>
  );
};
