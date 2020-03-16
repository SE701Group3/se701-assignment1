import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../../common/Header/Header';

export default () => {
  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Header />
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
    </header>
  );
};
