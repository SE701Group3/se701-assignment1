import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostInformation } from '../../services/PostDetailService';
import { handleVote } from '../../services/frontpageService';

const PostDetailPageContainer = ({ children }) => {
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [postToDisplay, setPostToDisplay] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [retrievedComments, setRetrievedComments] = useState([]);
  // const [postId, setPostID] = useState('');

  const { id } = useParams();

  useEffect(() => {
    async function getPostInformationOnLoad() {
      const response = await getPostInformation(id);
      setCommentsToDisplay(response.comments);
      setPostToDisplay(response);
      setPostsToDisplay(response.posts);
      setRetrievedComments(response.comments);
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

// eslint-disable-next-line react/jsx-props-no-spreading
export default PostDetailPageContainer;
