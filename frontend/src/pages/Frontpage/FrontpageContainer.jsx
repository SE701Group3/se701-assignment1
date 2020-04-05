import React, { useState, useEffect } from 'react';
import { getPosts, handleVote } from '../../services/frontpageService';

const FrontpageContainer = ({ children }) => {
  const [retrievedPosts, setRetrievedPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  async function getPostsOnLoad() {
    const response = await getPosts();
    setRetrievedPosts(response);
    setPostsToDisplay(response.reverse()); // As the database returns the posts in oldest first, the array is reversed to show newest posts first
  }

  // Runs when the frontpage is loaded to retrieve posts from the database
  useEffect(() => {
    getPostsOnLoad();
  }, []);

  // When user types in the search bar, the posts are filtered according to their titles
  const handleSearch = event => {
    setPostsToDisplay(
      retrievedPosts.filter(post =>
        post.title.toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    );
  };

  // Any variables or methods declared in newProps will be passed through to children
  // components as declared in frontpage.jsx
  const newProps = { postsToDisplay, handleSearch, handleVote, getPostsOnLoad };

  return React.cloneElement(children, { ...newProps });
};

export default FrontpageContainer;
