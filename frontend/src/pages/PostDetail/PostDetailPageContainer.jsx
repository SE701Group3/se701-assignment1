import React, { useState, useEffect } from 'react';
import getPostInformation from '../../services/PostDetailService';

const PostDetailPageContainer = ({ children }) => {
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [postToDisplay, setPostToDisplay] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [retrievedPosts, setRetrievedPosts] = useState([]);

  useEffect(() => {
    async function getPostInformationOnLoad() {
      const response = await getPostInformation();
      setCommentsToDisplay(response.Comments);
      setPostToDisplay(response);
      setPostsToDisplay(response.posts);
      setRetrievedPosts(response.posts);
    }
    getPostInformationOnLoad();
  }, []);

  const handleSearch = event => {
    setPostsToDisplay(retrievedPosts.filter(post => post.title.includes(event.target.value)));
  };

  return React.cloneElement(children, {
    postToDisplay,
    commentsToDisplay,
    postsToDisplay,
    handleSearch,
  });
};

export default PostDetailPageContainer;
