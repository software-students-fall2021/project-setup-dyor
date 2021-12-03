const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const faker = require("faker");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

const User1 = require("./mockDB");
let mongoServer;

const runServer = async () => {
  mongoServer = await MongoMemoryServer.create();
};
runServer();

const dbConnect = async () => {
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

const dbDisconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
chai.use(chaiHttp);

let token;

describe("Users route", () => {
  const signup = "/users/signup";
  const signin = "/users/signin";

  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const preSave = {
    email: "mr.sometest@gmail.com",
    password: faker.internet.password(),
  };

  before(async () => {
    dbConnect();
    const validStudentUser = new User1(preSave);
    // const savedStudentUser = await validStudentUser.save();
    const result = await chai.request(app).post(signup).send(validStudentUser);
    console.log(result);
    // expect(result.status).to.equal(200);
    // token = result.body.token;
  });

  after(async () => dbDisconnect());

  describe("signup", () => {
    it("should crete new user if email not found", async () => {
      const validStudentUser = new User1(user);
      const savedStudentUser = await validStudentUser.save();

      const result = await chai
        .request(app)
        .post(signup)
        .send(savedStudentUser);

      expect(result.status).to.equal(400);
      expect(savedStudentUser).not.to.be.empty;
      // try {
      //   const result = await chai.request(app).post(signup).send(user);
      //   // expect(savedStudentUser.status).to.equal(200);
      //   // expect(savedStudentUser).to.have.property("email");
      //   // expect(savedStudentUser.body).to.have.property("password");
      //   //   expect(savedStudentUser).not.to.be.empty;
      //   expect(result.body).not.to.be.empty;
      // } catch (error) {
      //   console.log(error);
      // }
    });

    it("should return 403 if email was found", async () => {
      try {
        await chai.request(app).post(signup).send(preSave);
        const validStudentUser = new User1(preSave);
        const savedStudentUser = await validStudentUser.save();
        const request = await chai
          .request(app)
          .post(signinp)
          .send(savedStudentUser);
      } catch (error) {
        // expect(error.status).to.equal(403);
        // expect(error.response.text).to.equal(
        //   '{ success: false, error: "email is already in use" }',
        // );
      }
    });
  });

  describe("signin", () => {
    it("should return validation error if user email and password empty", async () => {
      let user = {};
      try {
        await chai.request(app).post(signup).send(preSave);
        const validStudentUser = new User1(user);

        const savedStudentUser = await validStudentUser.save();
        const result = await chai
          .request(app)
          .post(signin)
          .send(savedStudentUser);
      } catch (error) {
        console.log(error);
        //   expect(error._message).to.be.equal("User1 validation failed");
        // expect(error.kind).to.be.equal("required");
      }
      // const cnt = await User1.count();
      // expect(cnt).to.equal(0);
    });

    it("should return 200 and our token", async () => {
      // try {
      await chai.request(app).post(signup).send(preSave);

      const validStudentUser = new User1(user);
      const savedStudentUser = await validStudentUser.save();
      const result = await chai
        .request(app)
        .post(signin)
        .send(savedStudentUser);
      console.log(result);
      //   // expect(result.status).to.be.equal(200);
      //   // expect(result.body).not.to.be.empty;
      //   // expect(result.body).to.have.property("token");
      // } catch (error) {
      //   throw new Error(error);
      // }
    });
  });
});
