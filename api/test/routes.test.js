const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should;
const expect = require("chai").expect;
const app = require("../server");

chai.use(chaiHttp);
chai.use(should);

describe("GET route", () => {
  it("Page should return notification of running port", (done) => {
    chai
      .request(app)
      .get("/")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
