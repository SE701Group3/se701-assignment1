import { enableFetchMocks } from 'jest-fetch-mock';
import updateService from './updatePostService';
import { getPostRoute } from './apiRoutes';

// Ensure that things are mocked before we import the implementation-under-test.
enableFetchMocks();

process.on('unhandledRejection', up => {
  throw up;
});

describe('Test update service', () => {
  it('sends a PUT request to the right endpoint', async () => {
    fetch.mockResponseOnce('{"_id": 1}', {
      status: 200,
      statusText: 'OK',
    });
    await updateService(1, 'title', 'body');
    expect(fetch.mock.calls[0][0]).toEqual(getPostRoute(1));
    expect(fetch.mock.calls[0][1].method).toEqual('PUT');
  });

  it('sends the right parameters to the request', async () => {
    fetch.mockResponseOnce('{"_id": 1}', {
      status: 200,
      statusText: 'OK',
    });
    await updateService(1, 'title', 'body');
    expect(fetch.mock.calls[0][1].body).toEqual(`{"id":1,"title":"title","body":"body"}`);
  });

  it('throws an error with the right message when the request fails', async () => {
    fetch.mockResponseOnce('{ "message": "Missing title" }', {
      status: 400,
      statusText: 'Bad Request',
    });
    await expect(updateService(1, '', 'body')).rejects.toThrow('Missing title');
  });
});
