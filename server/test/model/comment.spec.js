process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const CommentModel = require('../../src/db/models/comments');
const db = require('../../src/db');

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
  