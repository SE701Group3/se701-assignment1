import { enableFetchMocks } from 'jest-fetch-mock';

// Ensure that fetch() is mocked before we import the implementation-under-test.
enableFetchMocks();

// eslint-disable-next-line import/first
import submitPost from './createPostService';

process.on('unhandledRejection', up => {
  throw up;
});

describe('submitPost', () => {
  it('sends a POST request to the right endpoint', async () => {
    fetch.mockResponseOnce('', {
      status: 200,
      statusText: 'OK',
    });
    await submitPost('title', 'body');
    expect(fetch.mock.calls[0][0]).toEqual('/api/post/create');
    expect(fetch.mock.calls[0][1].method).toEqual('POST');
  });

  it('sends the right parameters to the request', async () => {
    fetch.mockResponseOnce('', {
      status: 200,
      statusText: 'OK',
    });
    await submitPost('title', 'body');
    expect(fetch.mock.calls[0][1].body.title).toEqual('title');
    expect(fetch.mock.calls[0][1].body.body).toEqual('body');
  });

  it('throws an error with the right message when the request fails', async () => {
    fetch.mockResponseOnce('{ "message": "Missing title" }', {
      status: 400,
      statusText: 'Bad Request',
    });
    await expect(submitPost('', 'body')).rejects.toThrow('Missing title');
  });
});
