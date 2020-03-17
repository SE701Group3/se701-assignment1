/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';
import withCreateCommentService from './withCreateCommentService';

function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toDateString();
}

function nestComments(commentList, setModal) {
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

const CreateCommentModalService = withCreateCommentService(CreateCommentModal);

const PostDetailPage = ({ commentsToDisplay }) => {
  const [showModal, setModal] = useState(false);

  return (
    <div>
      <PostDetail />
      {commentsToDisplay.map(comment => (
        <Container maxWidth="sm" key={`${comment.id}-container-key`}>
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
      ))}
      <CreateCommentModalService showModal={showModal} setModal={setModal} />
    </div>
  );
};

export default PostDetailPage;
