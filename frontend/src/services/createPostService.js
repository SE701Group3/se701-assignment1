// eslint-disable-next-line import/prefer-default-export
export const submitPost = async postInfo => {
  const parameters = {
    ...postInfo,
    sender_created_at: new Date().toISOString(),
  };
  return fetch('/api/post/create', { method: 'POST', body: parameters });
};
