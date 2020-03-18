import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './PostDetailStyles.module.css';

const CreateCommentModal = ({ showModal, errorMessage, onSubmit, onClose }) => {
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    onSubmit(body);
  };

  const handleBodyChange = event => {
    console.log(event.target.value);
    setBody(event.target.value);
  };

  return (
    <div>
      <Modal open={showModal} onClose={onClose}>
        <div className={styles.modal}>
          <Typography variant="h2">Post Comment</Typography>
          <p>{errorMessage}</p>
          <Typography>Comment</Typography>
          <TextField
            className={styles.bodyText}
            InputProps={{ disableUnderline: true }}
            margin="normal"
            multiline
            rows={10}
            id="body"
            name="body"
            value={body}
            onChange={handleBodyChange}
          />
          <div className={styles.modalButtons}>
            <Button classes={{ root: styles.cancelButton }} onClick={onClose}>
              Cancel
            </Button>
            <Button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default CreateCommentModal;
