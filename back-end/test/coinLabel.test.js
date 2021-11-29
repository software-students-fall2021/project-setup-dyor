const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority&ssl=true`;

describe("GET /coinLabelData", () => {
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
  it("Should return 200-OK for /coinLabelData with all Coin Labels", async () => {
    const res = await request(app).get("/coinLabelData");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(200);
    res.body.forEach((element) => {
      expect(element).have.property("name");
      expect(element).have.property("symbol");
    });
  });
  it("Should return 404-NOT-FOUND for /coinLabelDat with all Coin Labels", async () => {
    const res = await request(app).get("/coinLabelDat");
    expect(res.status).to.equal(404);
  });
});
