const getComments = async (postId) => {
  // const response = await fetch('/api/post/postId').then(respose => respose.json());

  // return response;

  return {
    "id": 426,
    "title": "Threader is good?",
    "body": "as the title said",
    "date_created": "2020-03-12T03:26:09.094Z",
    "upvotes_clap": 2,
    "upvotes_laugh": 10,
    "upvotes_sad": 0,
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
            }
        ]
      },
      {
        id: 781,
        body: 'I Agree!',
        date_created: '2020-03-11T03:26:09.094Z',
        children: [
            
        ]
      },
      {
        id: 523,
        body: 'hello!',
        date_created: '2020-03-11T03:26:09.094Z',
        children: [
            
        ]
      }
    ],
    response: 'ok',
  };
};

// eslint-disable-next-line camelcase
export const handleVote = async ({ id, date_created, upvote_type, upvote }) => {
    const params = {
      id,
      date_created,
      upvote_type,
      upvote,
    };
  
    const response = await fetch(`/api/post/${id}/upvote`, {
      method: 'PUT',
      body: params,
    }).then(responseBody => responseBody.json());
  
    if (response.message) {
      console.log('error');
    }
  };