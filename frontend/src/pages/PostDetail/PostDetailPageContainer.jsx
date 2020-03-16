import React, { useState, useEffect } from 'react';
import getPostInformation from '../../services/PostDetailService';

const PostDetailPageContainer = ({ children }) => {
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);

  useEffect(() => {
    async function getPostInformationOnLoad() {
      const response = await getPostInformation();
      setCommentsToDisplay(response.Comments);
    }
    getPostInformationOnLoad();
  }, []);

  return React.cloneElement(children, { commentsToDisplay });
};

export default PostDetailPageContainer;
