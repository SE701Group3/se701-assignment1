import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import submitPost, { SubmitPostError } from '../../../services/createPostService';

export const createPostService = submit => CreatePost => ({
  showModal,
  setModal,
  retrievedSubthreaders,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [id, setPostId] = useState(false);

  const handleSubmit = async (title, body, subthread) => {
    try {
      const responseId = await submit(title, body, subthread);
      setErrorMessage(null);
      setModal(false);
      setPostId(responseId);
    } catch (error) {
      if (!(error instanceof SubmitPostError)) {
        setErrorMessage('Could not submit post. Please try again.');
        // eslint-disable-next-line no-console
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
        retrievedSubthreaders={retrievedSubthreaders}
      />
      {id && <Redirect to={`/post/${id}`} />}
    </>
  );
};

export default createPostService(submitPost);
