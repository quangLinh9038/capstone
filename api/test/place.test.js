const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should;
// const should = require("should");
const expect = require("chai").expect;
const server = require("../server");

const db = require("../server/src/models");
const { Place } = db;

chai.use(chaiHttp);
chai.use(should);

describe("Places", () => {
  beforeEach((done) => {
    Place.destroy({ where: {} }).then((err) => {
      done();
    });
  });

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
          expect(res.status).to.equal(204);
          res.body.should.be.a("array");
          res.body.length.should.be.equal(0);
          // res.to.have.property("body[0]").that.include.all.keys(["id", "names"]);
          done();
        });
    });
  });

  describe("POST /places", () => {
    /***
     * POST: /places
     *
     */

    it("It should create one Place", (done) => {
      let place = {
        name: "HanoiCity",
        category: "Historical",
        description: "Capital",
      };
      chai
        .request(server)
        .post("/places")
        .send(place)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("category");
          res.body.should.have.property("description");
          // expect(res.body.data).to.include({
          //   name: place.name,
          //   category: place.category,
          //   description: place.description,
          // });
          done();
        });
    });
  });
});

// {
// "name"
// "url"
// "img"
// "category
// "description
// "isHistorical
// "isUrban
// "isReligious": 0,
// "isMuseum": 1,
// "isShopping": 0,
// "isAdventure": 0,
// "isNature": 0,
// "isPark": 0,
// "lat": 21.04060254,
// "lng": 105.7987569,
// "unique_point": "21.0406025373268105.798756855961"
// }
