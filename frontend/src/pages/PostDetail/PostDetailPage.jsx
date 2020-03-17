import React from 'react';
import { Container } from '@material-ui/core';
import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';
import Header from '../../common/Header/Header';

function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toDateString();
}

function nestComments(commentList) {
  return commentList.map(comment => {
    return (
      <Container>
        <Comment body={comment.body} dateCreated={formatDate(comment.date_created)} />
        {nestComments(comment.children)}
      </Container>
    );
  });
}

const PostDetailPage = ({ postToDisplay, commentsToDisplay, postsToDisplay, handleSearch }) => {
  return (
    <div>
      <Header postsToDisplay={postsToDisplay} handleSearch={handleSearch} />

      <PostDetail postToDisplay={postToDisplay} />
      {commentsToDisplay.map(comment => {
        return (
          <Container maxWidth="sm">
            <Comment body={comment.body} dateCreated={formatDate(comment.date_created)} />
            {nestComments(comment.children)}
          </Container>
        );
      })}
      <CreateCommentModal />
    </div>
  );
};

export default PostDetailPage;
