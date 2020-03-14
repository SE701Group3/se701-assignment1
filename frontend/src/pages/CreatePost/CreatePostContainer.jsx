import React, { useState } from 'react';

import submitPost from '../../services/createPostService';

const CreatePostContainer = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async postInfo => {
    try {
      await submitPost(postInfo);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const newProps = { onSubmit: handleSubmit, errorMessage };
  return React.cloneElement(children, { ...newProps });
};

export default CreatePostContainer;
