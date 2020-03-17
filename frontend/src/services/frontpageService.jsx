export const getPosts = async () => {
  const response = await fetch('/posts').then(respose => respose.json());
  return response;
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
