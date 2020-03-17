import React, { useState } from 'react';

import { SubmitCommentError, submitComment } from '../../services/PostDetailService';

export const createCommentService = submit => CreateCommentModal => ({ showModal, setModal }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async body => {
    try {
      await submit(body);
      setErrorMessage(null);
      setModal(false);
    } catch (error) {
      if (!(error instanceof SubmitCommentError)) {
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
    <CreateCommentModal
      showModal={showModal}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
};

export default createCommentService(submitComment);
