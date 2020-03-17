export class SubmitPostError extends Error {}

export default async (title, body) => {
  const parameters = {
    title,
    body,
  };

  const requestBody = JSON.stringify(parameters);
  console.log(requestBody);

  const response = await fetch('/posts', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: requestBody,
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new SubmitPostError(message);
  }

  if (response.ok) {
    window.location.reload();
  }
};
