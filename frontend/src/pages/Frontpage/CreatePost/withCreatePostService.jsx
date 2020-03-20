import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import submitPost, { SubmitPostError } from '../../../services/createPostService';

export const createPostService = submit => CreatePost => ({ showModal, setModal }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [id, setPostId] = useState(false);

  const handleSubmit = async (title, body) => {
    try {
      const responseId = await submit(title, body);
      setErrorMessage(null);
      setModal(false);
      setPostId(responseId);
    } catch (error) {
      if (!(error instanceof SubmitPostError)) {
        setErrorMessage('Could not submit post. Please try again.');
        console.error(error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleClose = () => {
    setErrorMessage('');
    setModal(false);
  };

  return (
    <>
      <CreatePost
        showModal={showModal}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
      {id && <Redirect to={`/post/${id}`} />}
    </>
  );
};

export default createPostService(submitPost);
