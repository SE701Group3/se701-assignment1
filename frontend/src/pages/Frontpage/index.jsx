import React from "react";
import Header from "../../common/Header/Header";
import { Container } from "@material-ui/core";

const Index = ({ postsToDisplay }) => {
  return (
    <header className="App-header">
      <Header postsToDisplay={postsToDisplay} />
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

export default Index;
