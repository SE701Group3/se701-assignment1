import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './CreatePost.module.css';

const CreatePostModal = () => {
  const [showModal, setModal] = useState(true);
  return (
    <Modal open={showModal} onClose={() => setModal(false)}>
      <div className={styles.modal}>
        <Typography variant="h2">New Thread</Typography>
        <TextField
          className={styles.titleText}
          variant="outlined"
          margin="normal"
          required
          id="title"
          label="Thread Title"
          name="title"
        />
        <TextField
          className={styles.bodyText}
          variant="outlined"
          margin="normal"
          required
          multiline
          rows={10}
          id="body"
          label="Thread Content"
          name="body"
        />
        <div className={styles.modalButtons}>
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => setModal(false)}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CreatePostModal;
