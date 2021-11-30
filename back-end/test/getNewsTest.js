const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const News = require("../schemas/newsModel");
const { MockNewsOne, MockNewsTwo } = require("./mockdata");

const getNewsTest = () => {
  describe("GET /news", () => {
    beforeEach(async () => {
      await News.collection.dropIndexes();
      await News.collection.drop();

      await News.create(MockNewsOne);
      await News.create(MockNewsTwo);
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

    it("Should refresh the news in the database", async () => {
      const res = await request(app).put("/refresh/news");
      expect(res.status).to.equal(201);
    });

    it("Should refresh the news in the database", async () => {
      const res = await request(app).put("/refresh/google");
      expect(res.status).to.equal(404);
    });

  });
};

module.exports = getNewsTest;
