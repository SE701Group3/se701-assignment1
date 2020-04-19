import React, { useState } from 'react';
import deletePost, { DeletePostError } from '../../../services/deletePostService';

export const deletePostService = submit => DeletePost => ({
  showModal,
  setModal,
  id,
  loadPost,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      await submit(id);
      setErrorMessage(null);
      loadPost();
      setModal(false);
    } catch (error) {
      if (!(error instanceof DeletePostError)) {
        setErrorMessage('Could not Delete post. Please try again.');
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
      <DeletePost
        showModal={showModal}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </>
  );
};

export default deletePostService(deletePost);
