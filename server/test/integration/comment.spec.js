// Environment variable used to set the in-memory database when the server is instantiated
process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const app = require('../../app');
const db = require('../../src/db');

describe('Comments API', () => {
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

  /* Tests for create comment API */
  it('tests creating a comment', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    const commentUrl = '/api/comments';
    const commentData = {
      body: 'This is the body for a test comment',
      parentID: createdPost._id,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);

    expect(response1.status).toBe(201);
    done();
  });

  it('tests creating and updating a comment', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const postUrl = '/api/posts/';
    const response = await supertest(app)
      .post(postUrl)
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const commentData = {
      body: 'This is the body for a test comment',
      parentID: createdPost._id,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);
    expect(response1.status).toBe(201);

    // Grab the comment ID with another GET request
    const response2 = await supertest(app).get(postUrl.concat(createdPost._id));

    // update the comment
    const updatedComment = {
      commentBody: 'Second Body',
      parentID: createdPost._id,
    };

    const response3 = await supertest(app)
      .put(commentUrl.concat(response2.body.comments[0]._id))
      .send(updatedComment);
    expect(response3.status).toBe(200);

    // validate comment is updated
    const response4 = await supertest(app).get(postUrl.concat(response.body._id));
    expect(response4.body.comments[0].body).toBe(updatedComment.commentBody);
    expect(response4.body.comments[0].parentID).toBe(updatedComment.parentID);

    done();
  });

  it('tests updating a comment that doesnt exist', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const postUrl = '/api/posts/';
    const response = await supertest(app)
      .post(postUrl)
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const invalidID = 'non_existent_id';

    // update the comment
    const updatedComment = {
      commentBody: 'Second Body',
      parentID: createdPost._id,
    };

    const response3 = await supertest(app)
      .put(commentUrl.concat(invalidID))
      .send(updatedComment);
    expect(response3.status).toBe(404);

    done();
  });

  it('tests creating and updating a comment with an empty body', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const postUrl = '/api/posts/';
    const response = await supertest(app)
      .post(postUrl)
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const commentData = {
      body: 'This is the body for a test comment',
      parentID: createdPost._id,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);
    expect(response1.status).toBe(201);

    // Grab the comment ID with another GET request
    const response2 = await supertest(app).get(postUrl.concat(createdPost._id));

    // update the comment
    const updatedComment = {
      commentBody: '',
      parentID: createdPost._id,
    };

    const response3 = await supertest(app)
      .put(commentUrl.concat(response2.body.comments[0]._id))
      .send(updatedComment);
    expect(response3.status).toBe(200);

    done();
  });

  it('tests creating a comment with an invalid post id', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const commentData = {
      commentBody: 'This is the body for a test comment',
      parentID: createdPost._id + 5,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);

    expect(response1.status).toBe(400);
    done();
  });
});
