// Environment variable used to set the in-memory database when the server is instantiated
process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const app = require('../../app');
const db = require('../../src/db');

describe('Posts API', () => {
  beforeAll(async done => {
    db.connect()
      .then(() => done())
      .catch(err => done(err));
  });

  beforeEach(async done => {
    // clear database after each test to remove any dependencies between tests
    db.drop()
      .then(() => done())
      .catch(err => done(err));
  });

  afterAll(async done => {
    db.close()
      .then(() => done())
      .catch(err => done(err));
  });

  it('tests the create post endpoint and returns as success message', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;

    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.body).toBe(postData.body);

    expect(createdPost.upvotes_clap).toBe(0);
    expect(createdPost.upvotes_laugh).toBe(0);
    expect(createdPost.upvotes_sad).toBe(0);

    done();
  });

  it('tests the create post endpoint with no title and returns as error message', async done => {
    const postData = {};

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    expect(response.status).toBe(400);
    done();
  });
});
