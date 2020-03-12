export const getPosts = async () => {
  return {
    body: {
      posts: [
        {
          post_id: "testid1",
          content: "contentcontentcontent",
        },
        {
          post_id: "testid2",
          content: "content2",
        },
      ],
    },
  };
};
