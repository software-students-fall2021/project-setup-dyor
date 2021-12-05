const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const faker = require("faker");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

const UsersRouteTest = () => {
  let mongoServer;

  const runServer = async () => {
    mongoServer = await MongoMemoryServer.create();
  };
  runServer();

  const dbConnect = async () => {
    const uri = await mongoServer.getUri();
    console.log(await mongoose.connect(uri, { dbName: "usersTest" }));
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

    const inValid = {
      email: "mr@gail.com",
      password: "testpa13",
    };
    const preSave = {
      email: "mr.sometest@gmail.com",
      password: "testpass123",
    };

    before(async () => {
      dbConnect();

      const result = await chai.request(app).post(signup).send(preSave);
      expect(result.status).to.equal(200);
      token = result.body.token;
    });

    after(async () => dbDisconnect());

    describe("signup", () => {
      it("should return 403 if email provided to signup is present in the database", async () => {
        const result = await chai.request(app).post(signup).send(preSave);

        expect(result).not.to.be.empty;
        expect(result.status).to.equal(403);
        expect(result.body).to.have.property("success");
        expect(result.body).to.have.property("error");
        expect(result.body.error).to.equal("email is already in use");
        expect(result.body.success).to.equal(false);
      });

      it("should return 200 and signup", async () => {
        const result = await chai.request(app).post(signup).send(user);

        expect(result).not.to.be.empty;
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property("success");
        expect(result.body).to.have.property("token");
        expect(result.body.success).to.equal(true);
      });
    });

    describe("signin", () => {
      it("should return validation error if user email and password not sent", async () => {
        let user = {};

        const result = await chai.request(app).post(signin).send(user);
        expect(result).not.to.be.empty;
        expect(result.status).to.equal(400);
        expect(result.text).to.equal(
          '{"_original":{},"details":[{"message":"\\"email\\" is required","path":["email"],"type":"any.required","context":{"label":"email","key":"email"}}]}',
        );
      });

      it("should return validation error if user's password empty", async () => {
        let user = { email: "", password: "" };

        const result = await chai.request(app).post(signin).send(user);
        expect(result).not.to.be.empty;
        expect(result.status).to.equal(400);
        expect(result.text).to.equal(
          '{"_original":{"email":"","password":""},"details":[{"message":"\\"email\\" is not allowed to be empty","path":["email"],"type":"string.empty","context":{"label":"email","value":"","key":"email"}}]}',
        );
      });

      it("should return validation error if user email is empty", async () => {
        let user = { email: "", password: "Temp123" };

        const result = await chai.request(app).post(signin).send(user);
        expect(result).not.to.be.empty;
        expect(result.status).to.equal(400);
        expect(result.text).to.equal(
          '{"_original":{"email":"","password":"Temp123"},"details":[{"message":"\\"email\\" is not allowed to be empty","path":["email"],"type":"string.empty","context":{"label":"email","value":"","key":"email"}}]}',
        );
      });

      it("should return validation error if user's password empty", async () => {
        let user = { email: "mr.sometest@gmail.com", password: "" };

        const result = await chai.request(app).post(signin).send(user);
        expect(result).not.to.be.empty;
        expect(result.status).to.equal(400);
        expect(result.text).to.equal(
          '{"_original":{"email":"mr.sometest@gmail.com","password":""},"details":[{"message":"\\"password\\" is not allowed to be empty","path":["password"],"type":"string.empty","context":{"label":"password","value":"","key":"password"}}]}',
        );
      });

      it("should return 200 and our token", async () => {
        const result = await chai.request(app).post(signin).send(preSave);

        expect(result).not.to.be.empty;
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property("success");
        expect(result.body).to.have.property("token");
        expect(result.body).to.have.property("email");
      });
    });

    describe("resetPassword", () => {
      // it("should return 500 if email provided to signup is present in the database", async () => {
      //   const result = await chai
      //     .request(app)
      //     .post("/users/resetPassword")
      //     .send(inValid);

      //   // console.log(result);
      //   expect(result).not.to.be.empty;
      //   expect(result.status).to.equal(500);
      //   expect(result.body).to.have.property("success");
      //   expect(result.body).to.have.property("error");
      //   expect(result.body.error).to.equal("Could not reset password");
      //   expect(result.body.success).to.equal(false);
      // });
      it("should return 200 and reset", async () => {
        const result = await chai
          .request(app)
          .post("/users/resetPassword")
          .send(preSave);

        expect(result).not.to.be.empty;
        expect(result.status).to.equal(201);
        expect(result.body).to.have.property("success");
        expect(result.body).to.have.property("message");
        expect(result.body.message).to.equal("Password changed successfully");
        expect(result.body.success).to.equal(true);
      });
      // it("should return 404 if email provided to signup is present in the database", async () => {
      //   const result = await chai
      //     .request(app)
      //     .post("/users/resetPassword")
      //     .send(undefined);

      //   console.log(result);
      //   expect(result).not.to.be.empty;
      //   expect(result.status).to.equal(404);
      //   expect(result.body).to.have.property("success");
      //   expect(result.body).to.have.property("error");
      //   expect(result.body.error).to.equal("Could not reset password");
      //   expect(result.body.success).to.equal(false);
      // });
    });

    describe("currency/", () => {
      // To Do: stub the API instead of calling it

      // it("should return status code 200", async () => {
      //   const result = await chai.request(app).get(`/users/currency/CAD`);

      //   // console.log(result);
      //   expect(result).not.to.be.empty;
      //   expect(result.status).to.equal(200);
      //   // expect(result.body).to.have.property("success");
      //   // expect(result.body).to.have.property("message");
      //   // expect(result.body.message).to.equal("Password changed successfully");
      //   // expect(result.body.success).to.equal(true);
      // });

      it("should return 400  ", async () => {
        const invalidParam = "GdafBP";
        const result = await chai
          .request(app)
          .get(`/users/currency/${invalidParam}`);

        expect(result).not.to.be.empty;
        expect(result.status).to.equal(404);
      });
      it("should return 400  ", async () => {
        const result = await chai
          .request(app)
          .put(`/users/currency`)
          .send(preSave);

        expect(result).not.to.be.empty;
        expect(result.status).to.equal(200);
      });
    });
  });
};
module.exports = UsersRouteTest;
