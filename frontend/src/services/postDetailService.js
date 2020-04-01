import { getPostRoute, createCommentRoute } from './apiRoutes';

/* eslint-disable camelcase */
export class SubmitCommentError extends Error {}

export const getPostInformation = async postId => {
  return fetch(getPostRoute(postId)).then(respose => respose.json());
};

/*
  This function is used to handle the creation of comments through the API and
  persist the newly created comments to the database.
*/
export default async (children_id, body) => {
  const parameters = {
    children_id,
    body,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch(createCommentRoute(children_id), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: requestBody,
  });

  if (!response.ok) {
    const { message } = await response.json();
    if (message.includes('is required')) {
      throw new SubmitCommentError('Please ensure all fields are filled in');
    }
    throw new SubmitCommentError(message);
  }
};
