const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority&ssl=true`;

describe("GET /coinPredict", () => {
  before(function (done) {
    mongoose
      .connect(dbURI, {
        useNewURLParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        done();
      })
      .catch((error) => console.log(error.message));
  });

  it("Should return status=200 and appropiate data object for GET /coinPredict", async () => {
    const res = await request(app).get("/coinPredict");
    expect(res.status).to.equal(200);
  }).timeout(5000);
});
