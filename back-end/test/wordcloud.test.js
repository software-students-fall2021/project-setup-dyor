const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const sinon = require("sinon");
const axios = require("axios");

const baseURL = "/nfa";

describe("nfa", () => {
  describe(`GET ${baseURL}/wordcloud`, () => {
    let stub;

    // the mocked data would be data returned from twitter API
    const mockedResponseObj = {
      data: [
        {
          description:
            "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n" +
            "\n" +
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n" +
            "\n" +
            "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        },
        {
          description:
            "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n" +
            "\n" +
            "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        },
        {
          description:
            "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n" +
            "\n" +
            "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        },

        {
          description:
            "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n" +
            "\n" +
            "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        },
        {
          description:
            "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n" +
            "\n" +
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },
      ],
    };

    it("Should return 404-NOT-FOUND for /wordcloud", async () => {
      const res = await request(app).get("/wordcloud");
      expect(res.status).to.equal(404);
    });

    beforeEach(() => {
      stub = sinon.stub(axios, "get").resolves(mockedResponseObj);
    });

    afterEach(() => {
      stub.restore();
    });

    // it("Should return 200-OK for /nfa/wordcloud with an object with key data and value wordcloud ", async () => {
    //   const res = await request(app).get(`${baseURL}/wordcloud`);
    //   expect(res.body).to.be.an("object");
    //   expect(res.status).to.equal(200);
    //   expect(res.body).have.property("data");
    // });
    // it("Should return staus=500 when some error is encountered", async () => {
    //   stub.throws(Error("When the API IS DOWN"));
    //   const res = await request(app).get(`${baseURL}/wordcloud`);
    //   expect(res.status).to.equal(500);
    // });
  });
});
