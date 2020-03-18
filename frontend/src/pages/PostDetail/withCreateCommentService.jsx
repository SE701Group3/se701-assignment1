import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import submitComment, { SubmitCommentError } from '../../services/PostDetailService';

export const createCommentService = submit => CreateCommentModal => ({
  showModal,
  setModal,
  postID,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [toRedirect, setRedirect] = useState(false);

  const handleSubmit = async body => {
    try {
      await submit(postID, body);
      setErrorMessage(null);
      setModal(false);
      setRedirect(true);
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
      {toRedirect && <Redirect to={`/post/${postID}`} />}
    </>
  );
};

export default createCommentService(submitComment);
