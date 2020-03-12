import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/frontpageService";

const FrontpageContainer = ({ children }) => {
  const [retrievedPosts, setRetrievedPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function getPostsOnLoad() {
      const response = await getPosts();
      if (response.response === "ok") {
        setRetrievedPosts(response.posts);
        setPostsToDisplay(response.posts);
      }
    }

    getPostsOnLoad();
  }, []);

  const newProps = { postsToDisplay };

  /**
   * if this wraps one component than children prop is object
   * otherwise array
   */
  return <>{React.cloneElement(children, { ...newProps })}</>;
};

export default FrontpageContainer;
