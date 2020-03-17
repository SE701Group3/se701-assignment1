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
  return commentList.map(comment => {
    return (
      <Container>
        <Comment
          body={comment.body}
          dateCreated={formatDate(comment.date_created)}
          setModal={setModal}
        />
        {nestComments(comment.children, setModal)}
      </Container>
    );
  });
}

const CreateCommentModalService = withCreateCommentService(CreateCommentModal);

const PostDetailPage = ({ commentsToDisplay }) => {
  const [showModal, setModal] = useState(false);

  const handleOpen = () => {
    setModal(true);
  };

  return (
    <div>
      <PostDetail />
      {commentsToDisplay.map(comment => {
        return (
          <Container maxWidth="sm">
            <Comment
              body={comment.body}
              dateCreated={formatDate(comment.date_created)}
              setModal={handleOpen}
            />
            {nestComments(comment.children, handleOpen)}
          </Container>
        );
      })}
      <CreateCommentModalService showModal={showModal} setModal={setModal} />
    </div>
  );
};

export default PostDetailPage;
