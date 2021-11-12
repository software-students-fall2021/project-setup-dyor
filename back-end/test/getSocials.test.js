const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");

describe("SOCIALS", () => {
  describe("GET /social/:media/:asset", () => {
    it("Should return status=200 and appropiate data object for valid media and asset", async () => {
      const media = "twitter";
      const coin = "btc";
      const res = await request(app).get(`/social/${media}/${coin}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("name");
      expect(res.body[90]).to.have.property("username");
      expect(res.body[99]).to.have.property("tweet");
      expect(res.body[64]).to.have.property("url");
    }).timeout(5000);

    it("Should return status=200 and appropiate data object for valid media and asset", async () => {
      const media = "reddit";
      const coin = "doge";
      const res = await request(app).get(`/social/${media}/${coin}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("data");
      expect(res.body[9]).to.have.property("kind");
      expect(res.body[7].data).to.have.property("author");
      expect(res.body[6].data).to.have.property("url");
    }).timeout(5000);


    it("Should return status=404 and appropiate error message for invalid media", async () => {
      const media = "google";
      const res = await request(app).get(`/social/${media}/btc`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    }).timeout(4000);

    it("Should return status=404 and appropiate error message for invalid coin", async () => {
      const coin = "XYZ";
      const res = await request(app).get(`/social/twitter/${coin}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: `INVALID POST REQUEST, coin ${coin} NOT FOUND.`,
      });
    }).timeout(4000);

    it("Should return status=404 and appropiate error message for no coin", async () => {
      const res = await request(app).get(`/social/twitter`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({});
    }).timeout(4000);
  });
});
