import React from 'react';
import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Header from '../../common/Header/Header';

import styles from './frontpageStyles.module.css';

const Index = ({ postsToDisplay, handleSearch }) => {
  return (
    <>
      <Header postsToDisplay={postsToDisplay} handleSearch={handleSearch} />
      <Container maxWidth="sm">
        <p>This is the front page</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Container>
      <Fab
        classes={{
          root: styles.addButton,
        }}
        onClick={() => console.log('test')}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Index;
