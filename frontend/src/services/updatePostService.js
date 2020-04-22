import { getPostRoute } from './apiRoutes';

/* eslint-disable no-underscore-dangle */
export class UpdatePostError extends Error {}

export default async (id, title, body) => {
  const parameters = {
    id,
    title,
    body,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch(getPostRoute(id), {
    headers: {
      Authorization: document.cookie,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'PUT',
    body: requestBody,
  });

  if (!response.ok) {
    const { message } = await response.json();
    if (message.includes('is required')) {
      throw new UpdatePostError(`Please ensure all fields are filled in`);
    }
    throw new UpdatePostError(message);
  }
};
