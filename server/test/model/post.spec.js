process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const PostModel = require('../../src/db/models/post');
const CommentModel = require('../../src/db/models/comments');
const db = require('../../src/db');

describe('Post Model', () => {
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

  it('create post and save successfully', async done => {
    const postData = {
      title: 'Test Post',
      body: 'Hello, this is the body for a test post',
    };
    const validPost = new PostModel(postData);
    const savedPost = await validPost.save();

    expect(savedPost._id).toBeDefined();
    expect(savedPost.title).toBe(postData.title);

    // defaults set
    expect(savedPost.upvotes_clap).toBe(0);
    expect(savedPost.upvotes_laugh).toBe(0);
    expect(savedPost.upvotes_sad).toBe(0);

    // time stamps set
    expect(savedPost.date_created).toBeDefined();
    expect(savedPost.updatedAt).toBeDefined();

    done();
  });

  it('create post without required title should fail', async done => {
    const postWithoutRequiredTitle = new PostModel({});
    let err;
    try {
      await postWithoutRequiredTitle.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done();
  });

  it('create post without required body should fail', async done => {
    const postWithoutRequiredBody = new PostModel({
      title: 'Test Post',
    });
    let err;
    try {
      await postWithoutRequiredBody.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done();
  });
});

describe('Comment Model', () => {
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

  it('create comment and save successfully', async done => {
    const commentData = {
      parentID: '15',
      body: 'Hello, this is the body for a test comment',
    };
    const validComment = new CommentModel(commentData);
    const savedComment = await validComment.save();

    expect(savedComment.parentID).toBe(commentData.parentID);
    expect(savedComment.body).toBe(commentData.body);

    // time stamps set
    expect(savedComment.date_created).toBeDefined();
    expect(savedComment.updatedAt).toBeDefined();

    done();
  });

  it('create comment without required body should fail', async done => {
    const commentWithoutRequiredBody = new CommentModel({
      parentID: '10',
    });
    let err;
    try {
      await commentWithoutRequiredBody.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done();
  });

  it('create comment without required parentID should fail', async done => {
    const commentWithoutRequiredParentID = new CommentModel({
      body: 'Hello, this is the body for a test comment',
    });
    let err;
    try {
      await commentWithoutRequiredParentID.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done();
  });
});
