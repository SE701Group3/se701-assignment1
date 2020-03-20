/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';
import withCreateCommentService from './withCreateCommentService';
import Header from '../../common/Header/Header';

import styles from './PostDetailPage.module.css';

function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toDateString();
}

/*
  Function used to recursively retrieve and display child comments
*/
function nestComments(commentList, setModal) {
  if (commentList) {
    return commentList.map(comment => (
      <Container key={`${comment.id}-container-key`}>
        <Comment
          body={comment.body}
          dateCreated={formatDate(comment.date_created)}
          setModal={() => {
            setModal(true);
          }}
          key={`${comment.id}-key`}
        />
        {nestComments(comment.children, setModal)}
      </Container>
    ));
  }
  return null;
}

const CreateCommentModalService = withCreateCommentService(CreateCommentModal);

const PostDetailPage = ({ postToDisplay, commentsToDisplay, handleSearch, handleVote }) => {
  const [showModal, setModal] = useState(false);

  return (
    <div>
      <Header handleSearch={handleSearch} />

      <PostDetail postToDisplay={postToDisplay} handleVote={handleVote} />
      {commentsToDisplay
        ? commentsToDisplay.map(comment => (
            <Container maxWidth="sm" key={`${Math.floor(Math.random() * 100)}-container-key`}>
              <Comment
                body={comment.body}
                dateCreated={formatDate(comment.date_created)}
                setModal={() => {
                  setModal(true);
                }}
                key={`${Math.floor(Math.random() * 100)}`}
              />
              {nestComments(comment.children, setModal)}
            </Container>
          ))
        : null}
      <Fab
        classes={{
          root: styles.addButton,
        }}
        onClick={() => {
          setModal(true);
        }}
      >
        <AddIcon classes={{ root: styles.addIcon }} />
      </Fab>
      <CreateCommentModalService
        showModal={showModal}
        setModal={setModal}
        // eslint-disable-next-line no-underscore-dangle
        postID={postToDisplay._id}
      />
    </div>
  );
};

export default PostDetailPage;
