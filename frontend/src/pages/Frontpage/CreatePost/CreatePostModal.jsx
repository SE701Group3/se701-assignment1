import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './CreatePost.module.css';
import SubthreaderDropdown from '../../../common/Header/SubthreaderDropdown';

const CreatePostModal = ({ showModal, errorMessage, onSubmit, onClose, retrievedSubthreaders }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [subThread, setSubthread] = useState('');

  const handleSubmit = () => {
    onSubmit(title, body, subThread);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleBodyChange = event => {
    setBody(event.target.value);
  };

  const handleSubthreadChange = value => {
    setSubthread(value);
  };

  return (
    <Modal open={showModal} onClose={onClose}>
      <div className={styles.modal}>
        <Typography variant="h2" className={styles.heading}>
          New Thread
        </Typography>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <Typography>Thread Title</Typography>
        <TextField
          classes={{ root: styles.titleText }}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <Typography>Thread Content</Typography>
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
        <div>
          <div className={styles.modalButtons}>
            <Button classes={{ root: styles.cancelButton }} onClick={onClose}>
              Cancel
            </Button>
            <Button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <SubthreaderDropdown
            changeSubthread={handleSubthreadChange}
            retrievedSubthreaders={retrievedSubthreaders}
            pass
          />
        </div>
      </div>
    </Modal>
  );
};
export default CreatePostModal;
