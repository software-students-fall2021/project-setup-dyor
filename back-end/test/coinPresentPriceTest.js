const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");

const coinPresentPriceTest = () => {
  // const baseURL = "/coinPresentPriceAndChange";
  // describe("coinPresentPriceAndChange", () => {
  //   describe("GET /coinPresentPriceAndChange", () => {
  //     let stub;
  //     const mockedResponseObj = {
  //       data: {
  //         data: [
  //           {
  //             id: "bitcoin",
  //             rank: "1",
  //             symbol: "BTC",
  //             name: "Bitcoin",
  //             supply: "18867062.0000000000000000",
  //             maxSupply: "21000000.0000000000000000",
  //             marketCapUsd: "1240829075760.1864284551009062",
  //             volumeUsd24Hr: "20480134253.1819023535450713",
  //             priceUsd: "65766.9474855272341001",
  //             changePercent24Hr: "5.8813405636175149",
  //             vwap24Hr: "62917.0792613193444212",
  //             explorer: "https://blockchain.info/",
  //           },
  //           {
  //             id: "ethereum",
  //             rank: "2",
  //             symbol: "ETH",
  //             name: "Ethereum",
  //             supply: "118253501.4365000000000000",
  //             maxSupply: null,
  //             marketCapUsd: "560001974405.0101400287731104",
  //             volumeUsd24Hr: "10845993491.4843910881751567",
  //             priceUsd: "4735.6058603112154963",
  //             changePercent24Hr: "3.8383237812075116",
  //             vwap24Hr: "4633.1146071446609093",
  //             explorer: "https://etherscan.io/",
  //           },
  //           {
  //             id: "binance-coin",
  //             rank: "3",
  //             symbol: "BNB",
  //             name: "Binance Coin",
  //             supply: "166801148.0000000000000000",
  //             maxSupply: "166801148.0000000000000000",
  //             marketCapUsd: "107245386813.8594630766350012",
  //             volumeUsd24Hr: "1904866477.6613055950911804",
  //             priceUsd: "642.9535293957297169",
  //             changePercent24Hr: "-3.3192045667047261",
  //             vwap24Hr: "656.5123710341847979",
  //             explorer:
  //               "https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  //           },
  //           {
  //             id: "solana",
  //             rank: "4",
  //             symbol: "SOL",
  //             name: "Solana",
  //             supply: "302512369.6464954600000000",
  //             maxSupply: null,
  //             marketCapUsd: "74777784846.7695973631229253",
  //             volumeUsd24Hr: "1130609020.1728291585320060",
  //             priceUsd: "247.1891808396201948",
  //             changePercent24Hr: "-4.1401619116686474",
  //             vwap24Hr: "250.2380971236872696",
  //             explorer: "https://explorer.solana.com/",
  //           },
  //         ],
  //       },
  //     };
  //     beforeEach(() => {
  //       stub = sinon.stub(axios, "request").resolves(mockedResponseObj);
  //     });
  //     afterEach(() => {
  //       stub.restore();
  //     });
  //     it("Should return status=200 and the present price and change in price over the past day for all supported coins ", async () => {
  //       const res = await request(app).get(baseURL);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an("object");
  //       expect(res.body).to.have.property("bitcoin");
  //     });
  //     it("Should return status=404 given an unknown route 'NA'", async () => {
  //       const res = await request(app).get("/NA");
  //       expect(res.status).to.equal(404);
  //     });
  //     it("Should return staus=500 when some error is encountered", async () => {
  //       stub.throws(Error("API IS DOWN"));
  //       const res = await request(app).get(baseURL);
  //       expect(res.status).to.equal(500);
  //     });
  //   });
  //   describe("GET /coinPresentPriceAndChange/:coinID", () => {
  //     let stub;
  //     const mockedResponseObj = {
  //       data: {
  //         data: {
  //           id: "bitcoin",
  //           rank: "1",
  //           symbol: "BTC",
  //           name: "Bitcoin",
  //           supply: "18867062.0000000000000000",
  //           maxSupply: "21000000.0000000000000000",
  //           marketCapUsd: "1240829075760.1864284551009062",
  //           volumeUsd24Hr: "20480134253.1819023535450713",
  //           priceUsd: "65766.9474855272341001",
  //           changePercent24Hr: "5.8813405636175149",
  //           vwap24Hr: "62917.0792613193444212",
  //           explorer: "https://blockchain.info/",
  //         },
  //       },
  //     };
  //     beforeEach(() => {
  //       stub = sinon.stub(axios, "request").resolves(mockedResponseObj);
  //     });
  //     afterEach(() => {
  //       stub.restore();
  //     });
  //     it("Should return status=500 given an unsupported coin-id (say 'SCAMCOIN') whose data is not present ", async () => {
  //       const res = await request(app).get(`${baseURL}/SCAMCOIN`);
  //       expect(res.status).to.equal(500);
  //     });
  //     it("Should return status=200 and the details of the coin given a supported coin-id (say 'bitcoin') whose data is not present but API call has succeeded", async () => {
  //       const res = await request(app).get(`${baseURL}/bitcoin`);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.have.property("price");
  //       expect(res.body).to.have.property("priceChange");
  //     });
  //     it("Should return status=500 when API call has failed", async () => {
  //       stub.throws(Error("API IS DOWN"));
  //       const res = await request(app).get(`${baseURL}/bitcoin`);
  //       expect(res.status).to.equal(500);
  //     });
  //   });
  // });
};

module.exports = coinPresentPriceTest;
