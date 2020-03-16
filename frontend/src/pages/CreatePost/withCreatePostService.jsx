import React, { useState } from 'react';

import submitPost from '../../services/createPostService';

export const createPostService = submit => CreatePost => () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (title, body) => {
    try {
      await submit(title, body);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return <CreatePost errorMessage={errorMessage} onSubmit={handleSubmit} />;
};

export default createPostService(submitPost);
