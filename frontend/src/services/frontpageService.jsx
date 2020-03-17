export const getPosts = async () => {
  const response = await fetch('/posts').then(respose => respose.json());
  return response;

  // return {
  //   posts: [
  //     {
  //       id: 123,
  //       title: 'title1',
  //       content: 'contentcontentcontent',
  //       date_created: '2020-03-11T03:26:09.094Z',
  //       upvotes_clap: 10,
  //       upvotes_laugh: 2,
  //       upvotes_sad: 24,
  //     },
  //     {
  //       id: 213,
  //       title: 'title2',
  //       content: 'contentcontentcontent2',
  //       date_created: '2020-03-10T03:26:09.094Z',
  //       upvotes_clap: 2,
  //       upvotes_laugh: 6,
  //       upvotes_sad: 0,
  //     },
  //     {
  //       id: 312,
  //       title: 'title3',
  //       content: 'contentcontentcontent3',
  //       date_created: '2020-03-12T03:26:09.094Z',
  //       upvotes_clap: 0,
  //       upvotes_laugh: 0,
  //       upvotes_sad: 15,
  //     },
  //     {
  //       id: 333,
  //       title: 'title3',
  //       content: 'contentcontentcontent3',
  //       date_created: '2020-03-9T03:26:09.094Z',
  //       upvotes_clap: 23,
  //       upvotes_laugh: 0,
  //       upvotes_sad: 15,
  //     },
  //   ],
  //   response: 'ok',
  // };
};

// eslint-disable-next-line camelcase
export const handleVote = async ({ id, upvote_type, upvote }) => {
  // const params = {
  //   id,
  //   upvote_type,
  //   upvote,
  // };

  // const response = await fetch(`/api/post/${id}/upvote`, {
  //   method: 'PUT',
  //   body: params,
  // }).then(responseBody => responseBody.json());

  // if (response.message) {
  //   console.log('error');
  // }
  console.log(id, upvote_type, upvote);
};
