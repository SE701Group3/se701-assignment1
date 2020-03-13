// Environment variable used to set the in-memory database when the server is instantiated
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
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
      name: 'Test post',
    };

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    expect(createdPost.name).toBe(postData.name);
    done();
  });

  it('tests the create post endpoint with no name and returns as error message', async done => {
    const postData = {};

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    expect(response.status).toBe(400);
    done();
  });
});
