/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { usePromiseTracker } from 'react-promise-tracker';

import Header from '../../common/Header/Header';
import Post from './Post';
import styles from './frontpageStyles.module.css';
import CreatePostModal from './CreatePost/CreatePostModal';
import withCreatePostService from './CreatePost/withCreatePostService';
import LoadingIndicator from '../../common/Loader/LoadingIndicator';

const CreatePostModalServiced = withCreatePostService(CreatePostModal);

const Index = ({ postsToDisplay, handleSearch, handleVote, getPostsOnLoad }) => {
  const [showModal, setModal] = useState(false);
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      <Header handleSearch={handleSearch} />
<<<<<<< HEAD
      <Container maxWidth="sm" classes={{ root: styles.container }}>
        {postsToDisplay.map(post => (
          <Post
            id={post._id}
            title={post.title}
            content={post.body}
            key={`${post._id}-key`}
            upvotes={post.upvotes_laugh}
            downvotes={post.upvotes_sad}
            claps={post.upvotes_clap}
            handleVote={handleVote}
            frontpage
            loadPost={getPostsOnLoad}
          />
        ))}
      </Container>
=======
      {promiseInProgress ? (
        <LoadingIndicator />
      ) : (
        <Container maxWidth="sm" classes={{ root: styles.container }}>
          {postsToDisplay.map(post => (
            <Post
              id={post._id}
              title={post.title}
              content={post.body}
              key={`${post._id}-key`}
              upvotes={post.upvotes_laugh}
              downvotes={post.upvotes_sad}
              claps={post.upvotes_clap}
              handleVote={handleVote}
              frontpage
            />
          ))}
        </Container>
      )}
>>>>>>> Add loaders for comments and posts upon api calls - via using promise tracker and loader spinner
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
      <CreatePostModalServiced showModal={showModal} setModal={setModal} />
    </>
  );
};

export default Index;
