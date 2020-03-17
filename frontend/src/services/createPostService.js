export class SubmitPostError extends Error {}

export default async (title, body) => {
  const parameters = {
    title,
    body,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch('http://localhost:5001/posts', {
    method: 'POST',
    body: requestBody,
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new SubmitPostError(message);
  }
};
