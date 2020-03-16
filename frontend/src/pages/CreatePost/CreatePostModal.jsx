import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './CreatePost.module.css';

const CreatePostModal = ({ showModal, errorMessage, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    onSubmit(title, body);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleBodyChange = event => {
    setBody(event.target.value);
  };

  return (
    <Modal open={showModal} onClose={onClose}>
      <div className={styles.modal}>
        <Typography variant="h2">New Thread</Typography>
        <p>{errorMessage}</p>
        <TextField
          className={styles.titleText}
          variant="outlined"
          margin="normal"
          required
          id="title"
          label="Thread Title"
          name="title"
          value={title}
          onChange={handleTitleChange}
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
          value={body}
          onChange={handleBodyChange}
        />
        <div className={styles.modalButtons}>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CreatePostModal;
