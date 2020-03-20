import React, { useState } from 'react';

import submitComment, { SubmitCommentError } from '../../services/postDetailService';

/*
  Creates the modal for creating a comments and handles its functionality,
  such as submitting the comment and closing the modal.
*/
export const createCommentService = submit => CreateCommentModal => ({
  showModal,
  setModal,
  postID,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async body => {
    try {
      await submit(postID, body);
      setErrorMessage(null);
      setModal(false);
      window.location.reload();
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
    <>
      <CreateCommentModal
        showModal={showModal}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </>
  );
};

export default createCommentService(submitComment);
