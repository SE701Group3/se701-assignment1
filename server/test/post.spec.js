const mongoose = require("mongoose");
const PostModel = require("../src/models/post");
const supertest = require("supertest");
const app = require("../server");

describe("Testing the Posts API", () => {
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

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });

  it("tests the create post endpoint and returns as success message", async done => {
    const postData = {
      name: "Hello"
    };

    const response = await supertest(app)
      .post("/posts")
      .send(postData);

    expect(response.status).toBe(201);
    done();
  });
});
