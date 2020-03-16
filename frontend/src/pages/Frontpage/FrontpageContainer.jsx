import React, { useState, useEffect } from 'react';
import getPosts from '../../services/frontpageService';

const FrontpageContainer = ({ children }) => {
  const [retrievedPosts, setRetrievedPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  useEffect(() => {
    async function getPostsOnLoad() {
      const response = await getPosts();
      setRetrievedPosts(response.posts);
      setPostsToDisplay(response.posts);
    }

    getPostsOnLoad();
  }, []);

  const handleSearch = event => {
    setPostsToDisplay(retrievedPosts.filter(post => post.title.includes(event.target.value)));
  };

  const newProps = { postsToDisplay, handleSearch };

  /**
   * if this wraps one component than children prop is object
   * otherwise array
   */
  return <>{React.cloneElement(children, { ...newProps })}</>;
};

export default FrontpageContainer;
