import React, { useState, useEffect } from 'react';
import {
  getPosts,
  handleVote,
  getSubthreaders,
  getPostsForSubthread,
} from '../../services/frontpageService';

const FrontpageContainer = ({ children }) => {
  const [retrievedPosts, setRetrievedPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [retrievedSubthreaders, setSubthreaders] = useState([]);

  const getPostsOnLoad = async () => {
    const response = await getPosts();
    setRetrievedPosts(response);
    setPostsToDisplay(response.reverse()); // As the database returns the posts in oldest first, the array is reversed to show newest posts first
  };

  const updateSubthreadersList = async () => {
    const response = [...(await getSubthreaders())];
    setSubthreaders(response);
  };
  // Runs when the frontpage is loaded to retrieve posts from the database
  useEffect(() => {
    getPostsOnLoad();
    updateSubthreadersList();
  }, []);

  // When user types in the search bar, the posts are filtered according to their titles
  const handleSearch = event => {
    setPostsToDisplay(
      retrievedPosts.filter(post =>
        post.title.toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    );
  };

  const changeSubThread = async event => {
    if (event === 'All') {
      setPostsToDisplay(retrievedPosts.reverse());
    } else {
      const response = await getPostsForSubthread(event);

      if (!Array.isArray(response) || !response.length) {
        setPostsToDisplay([]);
      } else {
        setPostsToDisplay([]);
      }
    }
  };

  // Any variables or methods declared in newProps will be passed through to children
  // components as declared in frontpage.jsx
  const newProps = {
    postsToDisplay,
    handleSearch,
    handleVote,
    getPostsOnLoad,
    retrievedSubthreaders,
    changeSubThread,
    updateSubthreadersList,
  };

  return React.cloneElement(children, { ...newProps });
};

export default FrontpageContainer;
