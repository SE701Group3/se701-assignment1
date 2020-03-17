import React, { useState, useEffect } from 'react';
import { getPosts, handleVote } from '../../services/frontpageService';

const FrontpageContainer = ({ children }) => {
  const [retrievedPosts, setRetrievedPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  useEffect(() => {
    async function getPostsOnLoad() {
      const response = await getPosts();
      setRetrievedPosts(response);
      setPostsToDisplay(response.reverse());
    }

    getPostsOnLoad();
  }, []);

  const handleSearch = event => {
    setPostsToDisplay(retrievedPosts.filter(post => post.title.includes(event.target.value)));
  };

  const newProps = { postsToDisplay, handleSearch, handleVote };

  return React.cloneElement(children, { ...newProps });
};

export default FrontpageContainer;
