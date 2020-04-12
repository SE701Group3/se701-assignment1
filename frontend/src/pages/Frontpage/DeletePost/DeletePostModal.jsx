import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from '../CreatePost/CreatePost.module.css';

const DeletePostModal = ({ showModal, errorMessage, onSubmit, onClose }) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal open={showModal} onClose={onClose}>
      <div className={styles.modal}>
        <Typography variant="h5" className={styles.deleteText}>
          Are you sure you want to delete this thread?
        </Typography>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <div className={styles.modalButtons}>
          <Button classes={{ root: styles.cancelDeleteButton }} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.confirmDeleteButton} onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeletePostModal;
