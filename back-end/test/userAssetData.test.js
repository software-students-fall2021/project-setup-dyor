const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { User } = require("../models/users");
const { MongoMemoryServer } = require("mongodb-memory-server");

const {
  MockAssets,
  MockUserOneRepeatedAsset,
  MockNewAsset,
  MockUserOne,
  MockUserTwo,
  MockUserOneJWT,
  MockUserTwoJWT,
  ValidDeletedUserJWT,
  InValidJWT,
} = require("./mockdata");

//redirection
describe("userAssetData", () => {
  let mongoServer;

  before(async () => {
    //creating a connection to the mongoserver
    //will be run once in the entire test
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // const presentUsers = await User.find({});
    // console.log("Users before Suite");
    // console.log(presentUsers);
  });

  after(async () => {
    //removing the connection
    //will be run once after all tests have been concluded
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    //This is to ensure that the previously effect of any of the operations removed in the User collection
    //To use your own collection you have to import it as above, drop it in beforeEach, and then add mock data to it whereby the mock data is to be stored in mockdata.js
    await User.collection.drop();

    // let presentUsers = await User.find({});
    // console.log("Previous Users before Test");
    // console.log(presentUsers);

    //This is storing the MockUserOne and MockUserTwo afreshs
    await User.create(MockUserOne);
    await User.create(MockUserTwo);

    // presentUsers = await User.find({});
    // console.log("Present Users before Test");
    // console.log(presentUsers);
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
        .set("Authorization", "Bearer " + MockUserOneJWT);
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
        .set("Authorization", "Bearer " + MockUserOneJWT)
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
        .set("Authorization", "Bearer " + MockUserOneJWT)
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
        .post("/userAssetData")
        .set("Authorization", "Bearer " + InValidJWT);
      expect(res.status).to.equal(302);
    });

    it("POST | VALID JWT COOKIE BUT USER ABSENT IN DB, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .post("/userAssetData")
        .set("Authorization", "Bearer " + ValidDeletedUserJWT);
      expect(res.status).to.equal(302);
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | VALID NEW ASSET DATA | NEW ASSET, PREVIOUS YES | SHOULD RETURN OK & SUCCESS MESSAGE", async () => {
      const res = await request(app)
        .post("/userAssetData")
        .send(MockNewAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal(
        `SUCCESSFUL POST /userAssetData REQUEST`,
      );
      expect(res.body).to.have.property("postedData");
      expect(res.body.postedData).to.have.property("name");
      expect(res.body.postedData.name).to.equal(MockNewAsset.id);
      expect(res.body.postedData).to.have.property("quantityPurchased");
      expect(res.body.postedData.quantityPurchased).to.equal(
        MockNewAsset.quantityPurchased,
      );
      expect(res.body.postedData).to.have.property("unitPrice");
      expect(res.body.postedData.unitPrice).to.equal(MockNewAsset.unitPrice);
      expect(res.body.postedData).to.have.property("datePurchased");
      expect(res.body.postedData.datePurchased).to.equal(
        MockNewAsset.datePurchased,
      );
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | VALID NEW ASSET DATA | NEW ASSET, NO PREVIOUS | SHOULD RETURN OK & SUCCESS MESSAGE", async () => {
      const res = await request(app)
        .post("/userAssetData")
        .send(MockNewAsset)
        .set("Authorization", "Bearer " + MockUserTwoJWT);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal(
        `SUCCESSFUL POST /userAssetData REQUEST`,
      );
      expect(res.body).to.have.property("postedData");
      expect(res.body.postedData).to.have.property("name");
      expect(res.body.postedData.name).to.equal(MockNewAsset.id);
      expect(res.body.postedData).to.have.property("quantityPurchased");
      expect(res.body.postedData.quantityPurchased).to.equal(
        MockNewAsset.quantityPurchased,
      );
      expect(res.body.postedData).to.have.property("unitPrice");
      expect(res.body.postedData.unitPrice).to.equal(MockNewAsset.unitPrice);
      expect(res.body.postedData).to.have.property("datePurchased");
      expect(res.body.postedData.datePurchased).to.equal(
        MockNewAsset.datePurchased,
      );
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | INVALID NEW ASSET DATA (missing id property) | SHOULD RETURN FAILURE & ERROR MESSAGE", async () => {
      const { id, ...invalidMockNewAsset } = MockNewAsset;
      const res = await request(app)
        .post("/userAssetData")
        .send(invalidMockNewAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal("INVALID INPUT");
      expect(res.body).to.have.property("parsedInput");
      expect(res.body.parsedInput).to.deep.equal({ ...invalidMockNewAsset });
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | INVALID NEW ASSET DATA (missing quantityPurchased property) | SHOULD RETURN FAILURE & ERROR MESSAGE", async () => {
      const { quantityPurchased, ...invalidMockNewAsset } = MockNewAsset;
      const res = await request(app)
        .post("/userAssetData")
        .send(invalidMockNewAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal("INVALID INPUT");
      expect(res.body).to.have.property("parsedInput");
      expect(res.body.parsedInput).to.deep.equal({ ...invalidMockNewAsset });
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | INVALID NEW ASSET DATA (missing unitPrice property) | SHOULD RETURN FAILURE & ERROR MESSAGE", async () => {
      const { unitPrice, ...invalidMockNewAsset } = MockNewAsset;
      const res = await request(app)
        .post("/userAssetData")
        .send(invalidMockNewAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal("INVALID INPUT");
      expect(res.body).to.have.property("parsedInput");
      expect(res.body.parsedInput).to.deep.equal({ ...invalidMockNewAsset });
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | INVALID NEW ASSET DATA (missing unitPrice property) | SHOULD RETURN FAILURE & ERROR MESSAGE", async () => {
      const { unitPrice, ...invalidMockNewAsset } = MockNewAsset;
      const res = await request(app)
        .post("/userAssetData")
        .send(invalidMockNewAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal("INVALID INPUT");
      expect(res.body).to.have.property("parsedInput");
      expect(res.body.parsedInput).to.deep.equal({ ...invalidMockNewAsset });
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | INVALID NEW ASSET DATA (missing datePurchased property) | SHOULD RETURN FAILURE & ERROR MESSAGE", async () => {
      const { datePurchased, ...invalidMockNewAsset } = MockNewAsset;
      const res = await request(app)
        .post("/userAssetData")
        .send(invalidMockNewAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal("INVALID INPUT");
      expect(res.body).to.have.property("parsedInput");
      expect(res.body.parsedInput).to.deep.equal({ ...invalidMockNewAsset });
    });

    it("POST | VALID JWT COOKIE & USER PRESENT IN DB | VALID NEW ASSET DATA | REPEATED ASSET | SHOULD RETURN ERROR & ERROR MESSAGE", async () => {
      const res = await request(app)
        .post("/userAssetData")
        .send(MockUserOneRepeatedAsset)
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("userMessage");
      expect(res.body.userMessage).to.have.equal(
        `Unsuccesful POST /userAssetData, an asset pertaining to a given coin may be added only once. ${MockUserOneRepeatedAsset.id} asset already present.`,
      );
    });
  });

  describe("DELETE", () => {
    it("DELETE | JWT COOKIE ABSENT, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app).delete("/userAssetData");
      expect(res.status).to.equal(302);
    });

    it("DELETE | INVALID JWT COOKIE, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .delete("/userAssetData")
        .set("Authorization", "Bearer " + InValidJWT);
      expect(res.status).to.equal(302);
    });

    it("DELETE | VALID JWT COOKIE BUT USER ABSENT IN DB, REDIRECT SHOULD OCCUR", async () => {
      const res = await request(app)
        .delete("/userAssetData")
        .set("Authorization", "Bearer " + ValidDeletedUserJWT);
      expect(res.status).to.equal(302);
    });

    it("DELETE | VALID JWT COOKIE & USER PRESENT | ASSET ID ABSENT", async () => {
      //this is the asset id to which a delete is to be sent
      const res = await request(app)
        .delete("/userAssetData")
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({
        userMessage: "No asset specified for DELETE /userAssetData",
      });
    });

    it("DELETE | VALID JWT COOKIE & USER PRESENT | ASSETID QUERY PARAMETER & ASSET PRESENT", async () => {
      //this is the asset id to which a delete is to be sent
      const assetID = MockAssets[0].name;
      const res = await request(app)
        .delete("/userAssetData")
        .query({ assetID })
        .set("Authorization", "Bearer " + MockUserOneJWT);
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({
        userMessage: `SUCCESSFUL DELETE /userAssetData REQUEST.  ASSET ${assetID} HAS BEEN DELETED`,
      });
    });

    it("DELETE | VALID JWT COOKIE & USER PRESENT | ASSETID QUERY PARAMETER PRESENT BUT ASSET ABSENT FOR USER", async () => {
      //this is the asset id to which a delete is to be sent
      const assetID = MockAssets[0].name;
      const res = await request(app)
        .delete("/userAssetData")
        .query({ assetID })
        .set("Authorization", "Bearer " + MockUserTwoJWT);
      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({
        userMessage: `ASSET ${assetID} ABSENT FOR USER | DELETE FAILED`,
      });
    });
  });
});
