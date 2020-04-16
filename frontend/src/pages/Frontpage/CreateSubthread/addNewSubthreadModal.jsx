import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './CreateSubthread.module.css';

const CreateSubthreadModal = ({ showModal, errorMessage, onSubmit, onClose }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  return (
    <Modal open={showModal} onClose={onClose}>
      <div className={styles.modal}>
        <Typography variant="h2" className={styles.heading}>
          Create New SubThread
        </Typography>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <Typography>Subthread Name</Typography>
        <TextField
          classes={{ root: styles.titleText }}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          id="title"
          name="title"
          value={name}
          onChange={handleNameChange}
        />
        <div>
          <div className={styles.modalButtons}>
            <Button classes={{ root: styles.cancelButton }} onClick={onClose}>
              Cancel
            </Button>
            <Button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default CreateSubthreadModal;
