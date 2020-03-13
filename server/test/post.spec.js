const mongoose = require("mongoose");
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
    done();
  });

  it("tests the get post endpoint and returns as success message", async done => {
    const postData = {
      name: "Test Get"
    };

    await supertest(app)
      .post("/posts")
      .send(postData);

    const response = await supertest(app).get("/posts");
    const body = response.body;

    expect(body.length).toBe(1);
    done();
  });
});