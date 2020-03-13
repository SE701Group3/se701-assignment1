const mongoose = require("mongoose");
const PostModel = require("../../src/models/post");
const supertest = require("supertest");
const app = require("../../server");

describe("Posts API", () => {
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
    app.close(done);
  });

  it("tests the create post endpoint and returns as success message", async done => {
    const postData = {
      name: "Test Post"
    };

    const response = await supertest(app)
      .post("/posts")
      .send(postData);

    expect(response.status).toBe(201);

    const createdPost = response.body;
    expect(createdPost.name).toBe(postData.name);
    done();
  });

  it("tests the create post endpoint with no name and returns as error message", async done => {
    const postData = {};

    const response = await supertest(app)
      .post("/posts")
      .send(postData);

    expect(response.status).toBe(400);
    done();
  });
});
