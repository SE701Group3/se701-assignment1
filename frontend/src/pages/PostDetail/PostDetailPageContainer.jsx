import React, { useState, useEffect } from 'react';
import { getPostInformation } from '../../services/PostDetailService';
import { handleVote } from '../../services/frontpageService';

const PostDetailPageContainer = ({ children }) => {
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [postToDisplay, setPostToDisplay] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [retrievedComments, setRetrievedComments] = useState([]);

  useEffect(() => {
    async function getPostInformationOnLoad() {
      const response = await getPostInformation();
      setCommentsToDisplay(response.Comments);
      setPostToDisplay(response);
      setPostsToDisplay(response.posts);
      setRetrievedComments(response.Comments);
    }
    getPostInformationOnLoad();
  }, []);

  const handleSearch = event => {
    setCommentsToDisplay(
      retrievedComments.filter(comment => comment.body.includes(event.target.value)),
    );
  };

  const newProps = {
    postToDisplay,
    commentsToDisplay,
    postsToDisplay,
    handleSearch,
    handleVote,
  };

  return React.cloneElement(children, { ...newProps });
};

export default PostDetailPageContainer;
