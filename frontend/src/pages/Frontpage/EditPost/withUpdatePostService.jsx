import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import updatePost, { UpdatePostError } from '../../../services/updatePostService';

export const updatePostService = submit => EditPost => ({
  showModal,
  setModal,
  id,
  oldTitle,
  oldBody,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [updateSuccessful, setUpdateStatus] = useState(false);

  const handleSubmit = async (title, body) => {
    try {
      await submit(id, title, body);
      setErrorMessage(null);
      setModal(false);
      setUpdateStatus(true);
      window.location.reload();
    } catch (error) {
      if (!(error instanceof UpdatePostError)) {
        setErrorMessage('Could not edit post. Please try again.');
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
      <EditPost
        showModal={showModal}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onClose={handleClose}
        oldTitle={oldTitle}
        oldBody={oldBody}
      />
      {updateSuccessful ? <Redirect to={`/post/${id}`} refresh="true" /> : null}
    </>
  );
};

export default updatePostService(updatePost);
