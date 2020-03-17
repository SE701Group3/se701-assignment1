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

  it('update post successfully', async done => {
    // create post
    const postData = {
      title: 'First Title',
      body: 'First body',
    };

    const response1 = await supertest(app)
      .post('/posts')
      .send(postData);
    expect(response1.status).toBe(201);

    // update the post
    const updatedPost = {
      title: 'Second Title',
      body: 'Second Body',
    };

    const url = '/posts/';
    const response2 = await supertest(app)
      .put(url.concat(response1.body._id))
      .send({ title: updatedPost.title, body: updatedPost.body });
    expect(response2.status).toBe(200);

    // check if the database was updated
    // TODO change to fetch specific post once endpoint implemented
    const response3 = await supertest(app).get(url);
    expect(response3.body[0].title).toBe(updatedPost.title);
    expect(response3.body[0].body).toBe(updatedPost.body);
    done();
  });

  it('update post with invalid id returns error', async done => {
    // database is empty so 404 expected
    const updatedPost = {
      title: 'Second Title',
      body: 'Second Body',
    };

    const url = '/posts/';
    const response2 = await supertest(app)
      .put(url.concat('100'))
      .send({ title: updatedPost.title, body: updatedPost.body });
    expect(response2.status).toBe(404);
    done();
  });

  it('tests the delete post method', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    const createdPost = response.body;
    const url = '/posts/';

    const response1 = await supertest(app).delete(url.concat(createdPost._id));

    expect(response1.status).toBe(200);

    const response3 = await supertest(app).get(url);

    expect(response3.body).toMatchObject([]);
    done();
  });

  it('tests the deletion of already deleted post', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    const url = '/posts/';

    const response1 = await supertest(app).delete(url.concat(createdPost._id));

    expect(response1.status).toBe(200);

    const response3 = await supertest(app).get(url);

    expect(response3.body).toMatchObject([]);

    const response2 = await supertest(app).delete(url.concat(createdPost._id));

    expect(response2.status).toBe(200);

    const response4 = await supertest(app).get(url);

    expect(response4.body).toMatchObject([]);
    done();
  });

  it('tests the delete route with no defined post id', async done => {
    const postData = {};

    const url = '/posts/';

    const response = await supertest(app).delete(url.concat(postData));

    expect(response.status).toBe(404);
    done();
  });

  it('tests the delete post method with an incorrect post id in url', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/posts')
      .send(postData);

    const createdPost = response.body;
    const url = '/posts/';

    const response1 = await supertest(app).delete(url.concat(createdPost._id + 3));

    expect(response1.status).toBe(404);
    done();
  });
});
