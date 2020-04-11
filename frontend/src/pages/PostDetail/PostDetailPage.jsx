/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
<<<<<<< HEAD
import { usePromiseTracker } from 'react-promise-tracker';

=======
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
>>>>>>> added collapsable comments
import PostDetail from './PostDetail';
import Comment from './Comment';
import CreateCommentModal from './CreateCommentModal';
import withCreateCommentService from './withCreateCommentService';
import Header from '../../common/Header/Header';
import LoadingIndicator from '../../common/Loader/LoadingIndicator';
import styles from './PostDetailPage.module.css';

const formatDate = date => {
  const newDate = new Date(date);
  return newDate.toDateString();
};

/*
  Function used to recursively retrieve and display child comments
*/
const nestComments = (commentList, setModal, setParentID) => {
  if (commentList && Array.isArray(commentList) && commentList.length) {
    return commentList.map(comment => (
      <Container className={styles.commentContainer} key={`${comment.id}-container-key`}>
        {comment.children.length ? (
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
              className={styles.comment}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Comment
                body={comment.body}
                dateCreated={formatDate(comment.date_created)}
                setModal={() => {
                  setModal(true);
                  setParentID(comment._id);
                }}
                key={`${Math.floor(Math.random() * 100)}`}
              />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={styles.subcommentContainer}>
              {nestComments(comment.children, setModal, setParentID)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : (
          <ExpansionPanel expanded={false}>
            <ExpansionPanelSummary>
              <Comment
                body={comment.body}
                dateCreated={formatDate(comment.date_created)}
                setModal={() => {
                  setModal(true);
                  setParentID(comment._id);
                }}
                key={`${Math.floor(Math.random() * 100)}`}
              />
            </ExpansionPanelSummary>
          </ExpansionPanel>
        )}
      </Container>
    ));
  }
  return null;
};

const CreateCommentModalService = withCreateCommentService(CreateCommentModal);

const PostDetailPage = ({
  postToDisplay,
  commentsToDisplay,
  handleSearch,
  handleVote,
  getPostInformationOnLoad,
}) => {
  const [showModal, setModal] = useState(false);
  const [parentID, setParentID] = useState(-1);
  const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
      <Header handleSearch={handleSearch} />

<<<<<<< HEAD
      <PostDetail
        postToDisplay={postToDisplay}
        handleVote={handleVote}
        getPostInformationOnLoad={getPostInformationOnLoad}
      />
      {promiseInProgress ? (
        <LoadingIndicator />
      ) : (
        commentsToDisplay.map(comment => (
          <Container maxWidth="sm" key={`${Math.floor(Math.random() * 100)}-container-key`}>
            <Comment
              body={comment.body}
              dateCreated={formatDate(comment.date_created)}
              setModal={() => {
                setModal(true);
                setParentID(comment._id);
              }}
              key={`${Math.floor(Math.random() * 100)}`}
            />
            {nestComments(comment.children, setModal, setParentID)}
          </Container>
        ))
      )}
=======
      <PostDetail postToDisplay={postToDisplay} handleVote={handleVote} />
      <div className={styles.comments}>
        {commentsToDisplay
          ? commentsToDisplay.map(comment => (
              <Container maxWidth="sm" key={`${Math.floor(Math.random() * 100)}-container-key`}>
                {comment.children.length ? (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      className={styles.comment}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Comment
                        body={comment.body}
                        dateCreated={formatDate(comment.date_created)}
                        setModal={() => {
                          setModal(true);
                          setParentID(comment._id);
                        }}
                        key={`${Math.floor(Math.random() * 100)}`}
                      />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.subcommentContainer}>
                      {nestComments(comment.children, setModal, setParentID)}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ) : (
                  <ExpansionPanel expanded={false}>
                    <ExpansionPanelSummary>
                      <Comment
                        body={comment.body}
                        dateCreated={formatDate(comment.date_created)}
                        setModal={() => {
                          setModal(true);
                          setParentID(comment._id);
                        }}
                        key={`${Math.floor(Math.random() * 100)}`}
                      />
                    </ExpansionPanelSummary>
                  </ExpansionPanel>
                )}
              </Container>
            ))
          : null}
      </div>
>>>>>>> added collapsable comments
      <Fab
        classes={{
          root: styles.addButton,
        }}
        onClick={() => {
          setModal(true);
          setParentID(postToDisplay._id);
        }}
      >
        <AddIcon classes={{ root: styles.addIcon }} />
      </Fab>
      <CreateCommentModalService
        showModal={showModal}
        setModal={setModal}
        postID={postToDisplay._id}
        parentID={parentID}
      />
    </div>
  );
};

export default PostDetailPage;
