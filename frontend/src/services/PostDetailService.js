export class SubmitCommentError extends Error {}

export const getPostInformation = async postId => {
  // const response = await fetch('/api/post/postId').then(respose => respose.json());

  // return response;
  console.log(postId);
  return {
    id: 426,
    title: 'Threader is good?',
    content: 'as the title said',
    date_created: '2020-03-12T03:26:09.094Z',
    upvotes_clap: 2,
    upvotes_laugh: 10,
    upvotes_sad: 0,
    Comments: [
      {
        id: 231,
        body: 'Iorem Ipsum',
        date_created: '2020-03-11T03:26:09.094Z',
        children: [
          {
            id: 123,
            body: 'Child1',
            date_created: '2020-03-11T03:26:09.094Z',
            children: [
              {
                id: 123,
                body: 'Child2',
                date_created: '2020-03-11T03:26:09.094Z',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 781,
        body: 'I Agree!',
        date_created: '2020-03-11T03:26:09.094Z',
        children: [
          {
            id: 123,
            body: 'Child1',
            date_created: '2020-03-11T03:26:09.094Z',
            children: [],
          },
        ],
      },
      {
        id: 523,
        body: 'hello!',
        date_created: '2020-03-11T03:26:09.094Z',
        children: [],
      },
    ],
    response: 'ok',
  };
};

export const submitComment = async (postId, parentId, body) => {
  const parameters = {
    postId,
    parentId,
    body,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch(`/post/${postId}/comment`, {
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
