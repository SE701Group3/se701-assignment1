import React from 'react';
import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Header from '../../common/Header/Header';
import Post from './Post';

import styles from './frontpageStyles.module.css';

const Index = ({ postsToDisplay, handleSearch }) => {
  return (
    <>
      <Header postsToDisplay={postsToDisplay} handleSearch={handleSearch} />
      <Container maxWidth="sm">
        {postsToDisplay.map(post => (
          <Post
            title={post.title}
            content={post.content}
            key={`${post.id}-key`}
            upvotes={post.upvotes_laugh}
            downvotes={post.upvotes_sad}
            claps={post.upvotes_clap}
          />
        ))}
      </Container>
      <Fab
        classes={{
          root: styles.addButton,
        }}
        onClick={() => console.log('test')}
      >
        <AddIcon classes={{ root: styles.addIcon }} />
      </Fab>
    </>
  );
};

export default Index;
