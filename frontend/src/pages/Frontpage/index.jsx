import React from "react";
import Header from "../../common/Header/Header";
import Post from "./Post";
import { Container } from "@material-ui/core";

export default () => {
  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Header />
      <Container maxWidth="sm">
        <Post
          title="Title One"
          date="28347928"
          content="Ea consequatur animi ut sapiente accusantium aut. Eveniet cum sit dolorum vero adipisci totam accusantium suscipit."
        />
        <Post
          title="Another Post"
          date="28347928"
          content="Ea consequatur animi ut sapiente accusantium aut. Eveniet cum sit dolorum vero adipisci totam accusantium suscipit."
        />
        <Post
          title="Post Num 3"
          date="28347928"
          content="Ea consequatur animi ut sapiente accusantium aut. Eveniet cum sit dolorum vero adipisci totam accusantium suscipit."
        />
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
