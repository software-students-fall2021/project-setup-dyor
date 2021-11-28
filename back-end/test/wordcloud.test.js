// const chai = require("chai");
// const expect = chai.expect;
// const request = require("supertest");
// const app = require("../app");
// // const sinon = require("sinon");
// // const axios = require("axios");

// const baseURL = "/nfa";

// describe("nfa", () => {
//   describe(`GET ${baseURL}/wordcloud/:id`, () => {
//     it("Should return 404-NOT-FOUND for /wordcloud", async () => {
//       const res = await request(app).get("/wordcloud");
//       expect(res.status).to.equal(404);
//     });

//     it("Should return 200-OK for /nfa/wordcloud with an object with key data and value wordcloud ", async () => {
//       const res = await request(app).get(`${baseURL}/wordcloud/BTC`);
//       expect(res.body).to.be.an("object");
//       expect(res.status).to.equal(200);
//       expect(res.body).have.property("data");
//     });

//     it("Should return status=500 given an unsupported coin-id (say 'SCAMCOIN') whose data is not present ", async () => {
//       const res = await request(app).get(`${baseURL}/wordcloud/SCAMCOIN`);
//       expect(res.status).to.equal(500);
//     });
//   });
// });
