const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should;
// const should = require("should");
const expect = require("chai").expect;
const server = require("../server");

chai.use(chaiHttp);
chai.use(should);

describe("Places", () => {
  // Place endpoints coverage
  describe("GET /places", () => {
    /*
     * GET: /places
     * Get all Places testing
     */
    it("It should get all the Place with no content", (done) => {
      chai
        .request(server)
        .get("/places")
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  // describe("POST /places", () => {
  //   /***
  //    * POST: /places
  //    *
  //    */

  //   it("It should create one Place", (done) => {
  //     let place = {
  //       name: "HanoiCity",
  //       category: "Historical",
  //       description: "Capital",
  //     };
  //     chai
  //       .request(server)
  //       .post("/places")
  //       .send(place)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("name");
  //         res.body.should.have.property("category");
  //         res.body.should.have.property("description");
  //         // expect(res.body.data).to.include({
  //         //   name: place.name,
  //         //   category: place.category,
  //         //   description: place.description,
  //         // });
  //         done();
  //       });
  //   });
  // });
});
