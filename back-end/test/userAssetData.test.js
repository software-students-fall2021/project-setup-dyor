const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = require("../models/users");
const { MongoMemoryServer } = require("mongodb-memory-server");

const MockAssets = [
  {
    name: "Ethereum",
    quantityPurchased: 1,
    unitPrice: 3000,
    datePurchased: "2021-11-21T00:56:01.438+00:00",
  },
  {
    name: "Bitcoin",
    quantityPurchased: 1,
    unitPrice: 60000,
    datePurchased: "2021-10-21T00:56:01.438+00:00",
  },
];

const MockUser = {
  _id: "61a339ebbe67295a6cfd0ade",
  email: "johncena@gmail.com",
  data: {
    assets: MockAssets,
  },
  password: "you_can't_see_me",
};

const ValidPresentUserJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "61a339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_SECRET,
);

//this is a valid token, but the user being referred to is not present in the data base he has been deleted
const ValidDeletedUserJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "60d339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_SECRET,
);

const InValidJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "61a339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_INVALID_SECRET,
);

//redirection
describe("userAssetData", () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    await User.create(MockUser);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("GET", () => {
    it("GET | JWT COOKIE ABSENT, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app).get("/userAssetData");
      expect(res.status).to.equal(302);
    });

    it("GET | INVALID JWT COOKIE, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + InValidJWT);
      expect(res.status).to.equal(302);
    });

    it("GET | VALID JWT COOKIE BUT USER ABSENT IN DB, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidDeletedUserJWT);
      expect(res.status).to.equal(302);
    });

    it("GET | VALID JWT COOKIE & USER PRESENT IN DB | NO ASSET ID SPECIFIER | SHOULD RETURN ALL ASSET DATA", async () => {
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidPresentUserJWT);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.equal(MockAssets.length);

      const requiredProperties = [
        "id",
        "quantityPurchased",
        "unitPrice",
        "datePurchased",
      ];

      res.body.forEach((element) => {
        for (let i = 0; i < requiredProperties.length; i++) {
          expect(element).have.property(requiredProperties[i]);
        }
      });
    });

    it("GET | VALID JWT COOKIE & USER PRESENT IN DB | ASSETID SPECIFIER AND ASSETID PRESENT | SHOULD RETURN DATA PERTAINING TO ONLY RELEVANT ASSETID", async () => {
      const assetID = "Ethereum";
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidPresentUserJWT)
        .query({ assetID });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");

      const requiredProperties = [
        "id",
        "quantityPurchased",
        "unitPrice",
        "datePurchased",
      ];

      for (let i = 0; i < requiredProperties.length; i++) {
        expect(res.body).have.property(requiredProperties[i]);
      }
      expect(res.body.id).to.equal(assetID);
    });

    it("GET | VALID JWT COOKIE & USER PRESENT IN DB | ASSETID SPECIFIER BUT ASSETID ABSENT | SHOULD RETURN ERROR STATUS AND MESSAGE", async () => {
      const assetID = "Scamcoin";
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidPresentUserJWT)
        .query({ assetID });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal(
        `User though authenticated and found in DB, asset information cannot be found in DB for GET /userAssetData?assetID=${assetID}, it is simply absent`,
      );
    });
  });

  describe("POST", () => {
    it("POST | JWT COOKIE ABSENT, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app).post("/userAssetData");
      expect(res.status).to.equal(302);
    });

    it("POST | INVALID JWT COOKIE, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + InValidJWT);
      expect(res.status).to.equal(302);
    });

    it("POST | VALID JWT COOKIE BUT USER ABSENT IN DB, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidDeletedUserJWT);
      expect(res.status).to.equal(302);
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | NO ASSET ID SPECIFIER | SHOULD RETURN ALL ASSET DATA", async () => {
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidPresentUserJWT);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.equal(MockAssets.length);

      const requiredProperties = [
        "id",
        "quantityPurchased",
        "unitPrice",
        "datePurchased",
      ];

      res.body.forEach((element) => {
        for (let i = 0; i < requiredProperties.length; i++) {
          expect(element).have.property(requiredProperties[i]);
        }
      });
    });

    it("GET | VALID JWT COOKIE & USER PRESENT IN DB | ASSETID SPECIFIER AND ASSETID PRESENT | SHOULD RETURN DATA PERTAINING TO ONLY RELEVANT ASSETID", async () => {
      const assetID = "Ethereum";
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidPresentUserJWT)
        .query({ assetID });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");

      const requiredProperties = [
        "id",
        "quantityPurchased",
        "unitPrice",
        "datePurchased",
      ];

      for (let i = 0; i < requiredProperties.length; i++) {
        expect(res.body).have.property(requiredProperties[i]);
      }
      expect(res.body.id).to.equal(assetID);
    });

    it("GET | VALID JWT COOKIE & USER PRESENT IN DB | ASSETID SPECIFIER BUT ASSETID ABSENT | SHOULD RETURN ERROR STATUS AND MESSAGE", async () => {
      const assetID = "Scamcoin";
      const res = await request(app)
        .get("/userAssetData")
        .set("Authorization", "Bearer " + ValidPresentUserJWT)
        .query({ assetID });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal(
        `User though authenticated and found in DB, asset information cannot be found in DB for GET /userAssetData?assetID=${assetID}, it is simply absent`,
      );
    });
  });
});
