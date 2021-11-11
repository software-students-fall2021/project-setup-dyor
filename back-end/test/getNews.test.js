const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");

describe("NEWS", () => {
  describe("GET /news", () => {
    it("Should return status=200 and appropiate data object of class AssetNews for GET /news", async () => {
      const res = await request(app).get("/news");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("Bitcoin");
    }).timeout(5000);
  });

  describe("GET /news/crypto", () => {
    it("Should return status=200 and appropiate data array of cryptoNews for GET /news/crypto", async () => {
      const res = await request(app).get("/news/crypto");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0]).to.have.property("title");
      expect(res.body[9]).to.have.property("author");
      expect(res.body[7]).to.have.property("description");
    });
  });

  describe("GET /news/asset/:coin", () => {
    it("Should return status=404 and appropiate error message for GET /news/asset:coin without a value for coin", async () => {
      const res = await request(app).get("/news/asset");
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    }).timeout(4000);

    it("Should return status=404 and appropiate error message for GET /news/asset:coin without an inavlid coin", async () => {
      const params = "xyz";
      const res = await request(app).get("/news/asset/" + params);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    }).timeout(4000);

    it("Should return status=200 and appropiate data array of news for the coin asked", async () => {
      const param = "Bitcoin";
      const res = await request(app).get("/news/asset/" + param);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0]).to.have.property("title");
      expect(res.body[9]).to.have.property("author");
      expect(res.body[7]).to.have.property("description");
    }).timeout(4000);
  });
});

describe("IMAGES", () => {
  describe("GET /news/images", () => {
    it("Should return status=200 and appropiate data array of images for GET /news/images", async () => {
      const res = await request(app).get("/news/images");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  }).timeout(3000);
});
