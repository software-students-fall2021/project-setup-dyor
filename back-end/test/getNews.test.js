const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
// const News = require('../schemas/newsModel')

// Configure chai
chai.use(chaiHttp);
chai.should();
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority&ssl=true`;

// const dbURI = "mongodb://localhost:27017/DYOR";
describe("NEWS", () => {
  // Setting up databse connection
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

  describe("GET /news", () => {
    it("Should return status=200 and appropiate data object of news on all coins", async () => {
      const res = await request(app).get("/news");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("bitcoin");
    });

    it("Should return status=404 and appropiate error message for GET /news/:coin with an inavlid coin", async () => {
      const params = "xyz";
      const res = await request(app).get("/news/" + params);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    });

    it("Should return status=200 and appropiate data array of news for the coin asked", async () => {
      const param = "ethereum";
      const res = await request(app).get("/news/" + param);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
});
