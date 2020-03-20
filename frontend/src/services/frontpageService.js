export const getPosts = async () => {
  const response = await fetch('/posts').then(respose => respose.json());
  return response;
};

// eslint-disable-next-line camelcase
export const handleVote = async ({ id, upvote_type, upvote }) => {
  const params = {
    id,
    upvote_type,
    upvote,
  };

  const requestBody = JSON.stringify(params);

  const response = await fetch(`/posts/${id}/upvote`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'PUT',
    body: requestBody,
  })
    .then(responseBody => responseBody.json())
    // eslint-disable-next-line no-unused-vars
    .catch(error => {});

  if (response) {
    if (response.message) {
      console.log(response.message);
    }
  }
  // console.log(id, upvote_type, upvote);
};
