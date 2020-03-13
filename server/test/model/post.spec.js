process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const PostModel = require("../../src/models/post");
const db = require("../../db");

describe("Post Model", () => {
  beforeAll(async done => {
    db.connect()
      .then(() => done())
      .catch(err => done(err));
  });

  beforeEach(async done => {
    // clear database after each test to remove any dependencies between tests
    await mongoose.connection.dropDatabase();
    done();
  });

  afterAll(async done => {
    db.close()
      .then(() => done())
      .catch(err => done(err));
  });

  it("create post and save successfully", async done => {
    const postData = {
      name: "Test postysdfdsfdsf"
    };
    const validPost = new PostModel(postData);
    const savedPost = await validPost.save();

    expect(savedPost._id).toBeDefined();
    expect(savedPost.name).toBe(postData.name);

    done();
  });

  it("create post without required fields should fail", async done => {
    const postWithoutRequiredField = new PostModel({});
    let err;
    try {
      await postWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done();
  });
});
