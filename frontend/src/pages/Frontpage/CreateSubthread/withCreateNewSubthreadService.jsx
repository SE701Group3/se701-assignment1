import React, { useState } from 'react';

import createSubthread, { SubmitSubthreadError } from '../../../services/createSubthread';

export const createNewSubthreadService = submit => CreatePost => ({
  showModal,
  setModal,
  updateSubthreadersList,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async title => {
    try {
      await submit(title);
      setErrorMessage(null);
      setModal(false);
    } catch (error) {
      if (!(error instanceof SubmitSubthreadError)) {
        setErrorMessage('Could not create subthread. Please try again.');
        // eslint-disable-next-line no-console
        console.error(error);
      } else {
        setErrorMessage(error.message);
      }
    }

    updateSubthreadersList();
  };

  const handleClose = async () => {
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
    </>
  );
};

export default createNewSubthreadService(createSubthread);
