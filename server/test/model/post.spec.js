const mongoose = require("mongoose");
const PostModel = require("../../src/models/post");

describe("Post Model", () => {
  beforeAll(async done => {
    // Initialize test database
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
    done();
  });

  beforeEach(async done => {
    // clear database after each test to remove any dependencies between tests
    await mongoose.connection.dropDatabase();
    done();
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });

  it("create post and save successfully", async done => {
    const postData = {
      name: "Test post"
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
