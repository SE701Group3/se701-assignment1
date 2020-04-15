// eslint-disable-next-line import/named
import { createSubthread } from './apiRoutes';

export class SubmitSubthreadError extends Error {}

export default async title => {
  const parameters = {
    title,
  };

  const requestBody = JSON.stringify(parameters);
  const response = await fetch(createSubthread, {
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
      throw new SubmitSubthreadError('Please ensure all fields are filled in');
    }
    throw new SubmitSubthreadError(message);
  }

  return (await response.json())._id;
};
