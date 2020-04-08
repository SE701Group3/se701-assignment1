import { trackPromise } from 'react-promise-tracker';
import { getPostRoute, createCommentRoute } from './apiRoutes';

/* eslint-disable camelcase */
export class SubmitCommentError extends Error {}

export const getPostInformation = async postId => {
  return trackPromise(fetch(getPostRoute(postId)).then(respose => respose.json()));
};

/*
  This function is used to handle the creation of comments through the API and
  persist the newly created comments to the database.
*/
export default async (body, parentID) => {
  const parameters = {
    body,
    parentID,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch(createCommentRoute(), {
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
