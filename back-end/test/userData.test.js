const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");

describe("userData", () => {
  describe("GET /userData", () => {
    it("Should return status=500 and appropiate error message for GET /userData without a value for query parameter userID", async () => {
      const res = await request(app).get("/userData");
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: `INVALID GET REQUEST, userID IS REQUIRED PARAMETER`,
      });
    });
    it("Should return status=500 and appropiate error message for GET /userData for a value of query parameter userID which is absent in Database", async () => {
      const userID = "Johnie";
      const res = await request(app).get("/userData").query({ userID });
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: `INVALID GET REQUEST, userID ${userID} NOT FOUND.`,
      });
    });
    it("Should return status=500 and appropiate error message for GET /userData for a value of query parameter assetID which is absent for some valid value of the parameter userID", async () => {
      const userID = "John";
      const assetID = "SCAM COIN";
      const res = await request(app)
        .get("/userData")
        .query({ userID, assetID });
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: `INVALID GET REQUEST, assetID ${assetID} for userID ${userID} NOT FOUND.`,
      });
    });
    it("Should return status=200 and appropiate data object of class OwnedAsset for GET /userData for valid values of query parameters userID, assetID where said user owns said asset", async () => {
      const userID = "John";
      const assetID = "Bitcoin";
      const res = await request(app)
        .get("/userData")
        .query({ userID, assetID });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("quantityPurchased");
      expect(res.body).to.have.property("unitPrice");
      expect(res.body).to.have.property("datePurchased");
    });
  });
});
