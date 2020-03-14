export default async postInfo => {
  const parameters = {
    ...postInfo,
    sender_created_at: new Date().toISOString(),
  };
  const response = await fetch('/api/post/create', { method: 'POST', body: parameters });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
};
