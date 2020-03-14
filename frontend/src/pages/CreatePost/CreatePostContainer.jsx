import React, { useState } from 'react';

import submitPost from '../../services/createPostService';

const CreatePostContainer = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (title, body) => {
    try {
      await submitPost(title, body);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const newProps = { onSubmit: handleSubmit, errorMessage };
  return React.cloneElement(children, { ...newProps });
};

export default CreatePostContainer;
