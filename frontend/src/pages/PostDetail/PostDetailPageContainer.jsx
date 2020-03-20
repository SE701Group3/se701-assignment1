import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostInformation } from '../../services/postDetailService';
import { handleVote } from '../../services/frontpageService';

const PostDetailPageContainer = ({ children }) => {
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [postToDisplay, setPostToDisplay] = useState([]);
  const [retrievedComments, setRetrievedComments] = useState([]);
  // const [postId, setPostID] = useState('');

  const { id } = useParams();

  // Runs when the post detail page is loaded. It retrieves information from the databse
  useEffect(() => {
    async function getPostInformationOnLoad() {
      const response = await getPostInformation(id);
      // The database returns comments in oldest first, so reversed to see the lastest comments
      setCommentsToDisplay(response.comments.reverse());
      setPostToDisplay(response);
      setRetrievedComments(response.comments);
    }
    getPostInformationOnLoad();
  }, []);

  // This displays comments whose content match what the user typed in
  // to the search bar. This is not case sensitive.
  const handleSearch = event => {
    setCommentsToDisplay(
      retrievedComments.filter(comment =>
        comment.body.toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    );
  };

  // Any variables or methods declared in newProps will be passed through to children
  // components as declared in /PostDetail/index.jsx
  const newProps = {
    postToDisplay,
    commentsToDisplay,
    handleSearch,
    handleVote,
  };

  return React.cloneElement(children, { ...newProps });
};

// eslint-disable-next-line react/jsx-props-no-spreading
export default PostDetailPageContainer;
