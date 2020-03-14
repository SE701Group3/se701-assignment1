import React, { useState } from 'react';

import submitPost from '../../services/createPostService';

const CreatePostContainer = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async postInfo => {
    const response = await submitPost(postInfo);
    if (!response.ok) {
      setErrorMessage(response.body);
    } else {
      setErrorMessage('');
    }
  };

  const newProps = { onSubmit: handleSubmit, errorMessage };
  return React.cloneElement(children, { ...newProps });
};

export default CreatePostContainer;
