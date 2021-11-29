const chai = require("chai");
const { before } = require("mocha");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority&ssl=true`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


describe("GET /news", () => {
    before(function (done) {
        mongoose.connect(uri, options).then(response => {
            done();
        }).catch(err => {
            console.log(err);
        });
    });

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
      const param = "bitcoin";
      const res = await request(app).get("/news/" + param);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
