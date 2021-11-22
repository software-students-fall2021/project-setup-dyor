const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");

describe("SOCIALS", () => {
  describe("GET /:media/:asset", () => {
    it("Should return status=200 and appropiate data object for valid media and asset twitter", async () => {
      const media = "twitter";
      const coin = "btc";
      const res = await request(app).get(`/${media}/${coin}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("name");
      expect(res.body[0]).to.have.property("username");
      expect(res.body[0]).to.have.property("tweet");
      expect(res.body[0]).to.have.property("url");
    }).timeout(5000);

    it("Should return status=200 and appropiate data object for valid media and asset reddit", async () => {
      const media = "reddit";
      const coin = "doge";
      const res = await request(app).get(`/${media}/${coin}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("data");
      expect(res.body[0]).to.have.property("kind");
      expect(res.body[0].data).to.have.property("author");
      expect(res.body[0].data).to.have.property("url");
    }).timeout(5000);

    it("Should return status=404 and appropiate error message for invalid media", async () => {
      const media = "google";
      const res = await request(app).get(`/${media}/btc`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    }).timeout(5000);

    it("Should return status=404 and appropiate error message for invalid coin twitter ", async () => {
      const coin = "XYZ";
      const res = await request(app).get(`/twitter/${coin}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Page not found",
      });
    }).timeout(5000);

    it("Should return status=404 and appropiate error message for invalid coin reddit", async () => {
      const coin = "XYZ";
      const res = await request(app).get(`/reddit/${coin}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Page not found",
      });
    }).timeout(5000);
  });

  describe("PUT /:media/:asset", () => {
    it("Should return status=200 and appropiate message putting twitter", async () => {
      const res = await request(app).put("/twitter");
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Written successfully",
      });
    }).timeout(5000);

    it("Should return status=200 and appropiate message putting reddit", async () => {
      const res = await request(app).put("/reddit");
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Written successfully",
      });
    }).timeout(5000);
  });
});
