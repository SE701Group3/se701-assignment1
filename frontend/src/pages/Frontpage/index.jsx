import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Header from '../../common/Header/Header';
import Post from './Post';
import styles from './frontpageStyles.module.css';
import CreatePostModal from '../CreatePost/CreatePostModal';
import withCreatePostService from '../CreatePost/withCreatePostService';

const CreatePostModalServiced = withCreatePostService(CreatePostModal);

const Index = ({ postsToDisplay, handleSearch, handleVote }) => {
  const [showModal, setModal] = useState(false);

  return (
    <>
      <Header postsToDisplay={postsToDisplay} handleSearch={handleSearch} />
      <Container maxWidth="sm">
        {postsToDisplay.map(post => (
          <Post
            id={post.id}
            title={post.title}
            content={post.content}
            key={`${post.id}-key`}
            upvotes={post.upvotes_laugh}
            downvotes={post.upvotes_sad}
            claps={post.upvotes_clap}
            handleVote={handleVote}
          />
        ))}
      </Container>
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
