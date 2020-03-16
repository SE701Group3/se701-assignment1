export class SubmitPostError extends Error {}

export default async (title, body) => {
  const parameters = {
    title,
    body,
    sender_created_at: new Date().toISOString(),
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch('/api/post/create', { method: 'POST', body: requestBody });

  if (!response.ok) {
    const { message } = await response.json();
    throw new SubmitPostError(message);
  }
};
