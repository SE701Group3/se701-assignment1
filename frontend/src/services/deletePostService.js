import { getPostRoute } from './apiRoutes';

/* eslint-disable no-underscore-dangle */
export class DeletePostError extends Error {}

export default async id => {
  const parameters = {
    id,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch(getPostRoute(id), {
    headers: {
      Authorization: document.cookie,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'DELETE',
    body: requestBody,
  });

  if (!response.ok) {
    const { message } = await response.json();
    // eslint-disable-next-line no-console
    console.log(message);
    throw new DeletePostError('Post does not exist');
  }
};
