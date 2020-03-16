const getPosts = async () => {
  // const response = await fetch('/api/post').then(respose => respose.json());

  // return response;

  return {
    posts: [
      {
        id: 123,
        title: 'title1',
        content: 'contentcontentcontent',
        date_created: '1556930832.311930',
      },
      {
        id: 213,
        title: 'title2',
        content: 'contentcontentcontent2',
        date_created: '1556940832.311930',
      },
      {
        id: 312,
        title: 'title3',
        content: 'contentcontentcontent3',
        date_created: '1556933832.311930',
      },
    ],
    response: 'ok',
  };
};

export default getPosts;
