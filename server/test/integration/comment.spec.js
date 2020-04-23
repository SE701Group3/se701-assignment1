// Environment variable used to set the in-memory database when the server is instantiated
process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const supertest = require('supertest');
const middleware = require('../../src/middleware/firebaseAuth');
const db = require('../../src/db');

const middlewareStub = sinon.stub(middleware, 'firebaseAuthMiddleware');
const app = require('../../app');
const User = require('../../src/db/models/users');

describe('Comments API', () => {
  beforeAll(async done => {
    db.connect()
      .then(() => done())
      .catch(err => done(err));
  });

  beforeEach(async done => {
    middlewareStub.callsFake((req, res, next) => {
      req.user = { email: 'test@test.com' };
      next();
    });
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

  /* Tests for POST comment API */
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

  it('tests creating a comment associates it with the correct user', async done => {
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    const user = await User.findOne({
      email: 'test314@test.com',
    });
    // validate the user has not yet been created
    expect(user).toBeNull();

    // create a new user when the comment is posted
    middlewareStub.callsFake((req, res, next) => {
      req.user = { email: 'test314@test.com' };
      next();
    });

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

    // Grab the comment ID with another GET request
    const response2 = await supertest(app).get('/api/posts/'.concat(createdPost._id));

    // find the user again as 'user' variable is const(?) and therefore null
    const user1 = await User.findOne({
      email: 'test314@test.com',
    });
    // validate the comment author id matches the user id
    // stringify due to 'serialized to the same string' error
    expect(JSON.stringify(response2.body.comments[0].author)).toBe(JSON.stringify(user1._id));
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
    const commentUrl = '/api/comments';
    const commentData = {
      body: 'This is the body for a test comment',
      parentID: createdPost._id + 5,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);

    expect(response1.status).toBe(400);
    done();
  });

  /* Tests for UPDATE comment API */
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

  it('tests updating a comment from a different user to be unsuccessful', async done => {
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

    // create a new user to update the comment
    middlewareStub.callsFake((req, res, next) => {
      req.user = { email: 'test314@test.com' };
      next();
    });

    // update the comment
    const updatedComment = {
      commentBody: 'Second Body',
      parentID: createdPost._id,
    };

    const response3 = await supertest(app)
      .put(commentUrl.concat(response2.body.comments[0]._id))
      .send(updatedComment);
    // validate comment status is 403 due to changing user
    expect(response3.status).toBe(403);
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

  /* Tests for DELETE comment API */
  it('tests deleting an existing childless comment', async done => {
    // Creating a post
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    // Creating a comment
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

    // Get the post in detail
    const detailedPost = await supertest(app).get(`/api/posts/${createdPost._id}`);

    // Delete the comment on the post
    const response2 = await supertest(app).delete(
      commentUrl.concat(detailedPost.body.comments[0]._id),
    );
    expect(response2.status).toBe(200);

    done();
  });

  it('tests deleting a comment from a different user to be unsuccessful', async done => {
    // Creating a post
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    // Creating a comment
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

    // create a new user when the comment is posted
    middlewareStub.callsFake((req, res, next) => {
      req.user = { email: 'test314@test.com' };
      next();
    });

    // Get the post in detail
    const detailedPost = await supertest(app).get(`/api/posts/${createdPost._id}`);

    // Delete the comment on the post
    const response2 = await supertest(app).delete(
      commentUrl.concat(detailedPost.body.comments[0]._id),
    );
    // validate comment status is 403 due to changing user before deleting
    expect(response2.status).toBe(403);

    done();
  });

  it('tests deleting a nonexistent comment', async done => {
    const commentUrl = '/api/comments/';

    const response = await supertest(app).delete(commentUrl.concat('68'));
    expect(response.status).toBe(404);

    done();
  });

  it('tests deleting a existing comment that has children', async done => {
    // Creating a post
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    // Creating a top level comment
    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const topCommentBody = 'This is the body for a test comment';
    const commentData = {
      body: topCommentBody,
      parentID: createdPost._id,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);

    expect(response1.status).toBe(201);

    // Create child comment
    const newCommentId = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body
      .comments[0]._id;

    const replyBody = 'That was an insightful comment!';
    const replyData = {
      body: replyBody,
      parentID: newCommentId,
    };

    const response2 = await supertest(app)
      .post(commentUrl)
      .send(replyData);

    expect(response2.status).toBe(201);

    // Delete the top level comment
    const response3 = await supertest(app).delete(commentUrl.concat(newCommentId));

    expect(response3.status).toBe(200);

    // Check comment tree still intact
    const post = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body;

    expect(post.comments[0].body).toBe('[Comment deleted]');
    expect(post.comments[0].children[0].body).toBe(replyBody);

    done();
  });

  it('tests deleting a comment that is a child of another', async done => {
    // Creating a post
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    // Creating a top level comment
    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const topCommentBody = 'This is the body for a test comment';
    const commentData = {
      body: topCommentBody,
      parentID: createdPost._id,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);

    expect(response1.status).toBe(201);

    // Create child comment
    const newCommentId = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body
      .comments[0]._id;

    const replyBody = 'That was an insightful comment!';
    const replyData = {
      body: replyBody,
      parentID: newCommentId,
    };

    const response2 = await supertest(app)
      .post(commentUrl)
      .send(replyData);

    expect(response2.status).toBe(201);

    // Delete the child comment
    const replyId = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body
      .comments[0].children[0]._id;

    const response3 = await supertest(app).delete(commentUrl.concat(replyId));

    expect(response3.status).toBe(200);

    // Check comment tree still intact
    const post = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body;

    expect(post.comments[0].body).toBe(topCommentBody);
    expect(post.comments[0].children[0]).toBeUndefined();
    done();
  });

  it('tests deleting a parent comment after its child comment has been deleted', async done => {
    // Creating a post
    const postData = {
      title: 'Test post',
      body: 'This is the body for a test post',
    };

    const response = await supertest(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(201);

    // Creating a top level comment
    const createdPost = response.body;
    const commentUrl = '/api/comments/';
    const topCommentBody = 'This is the body for a test comment';
    const commentData = {
      body: topCommentBody,
      parentID: createdPost._id,
    };

    const response1 = await supertest(app)
      .post(commentUrl)
      .send(commentData);

    expect(response1.status).toBe(201);

    // Create child comment
    const newCommentId = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body
      .comments[0]._id;

    const replyBody = 'That was an insightful comment!';
    const replyData = {
      body: replyBody,
      parentID: newCommentId,
    };

    const response2 = await supertest(app)
      .post(commentUrl)
      .send(replyData);

    expect(response2.status).toBe(201);

    // Delete the child comment
    const replyId = await (await supertest(app).get(`/api/posts/${createdPost._id}`)).body
      .comments[0].children[0]._id;

    const response3 = await supertest(app).delete(commentUrl.concat(replyId));

    expect(response3.status).toBe(200);

    // Delete the parent comment
    const response4 = await supertest(app).delete(commentUrl.concat(newCommentId));

    expect(response4.status).toBe(200);

    done();
  });
});
