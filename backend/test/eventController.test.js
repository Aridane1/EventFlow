// test/events.test.js

const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Events API", () => {
  it("should insert a new event", (done) => {
    before(async () => {
      await sequelize.sync({ force: true });
    });

    chai
      .request(app)
      .post("/api/events")
      .field("name", "Example Event")
      .field("description", "A description of the event.")
      .field("date", "2023-12-01T12:00:00Z") // Adjust date format according to your needs
      .field("numTickets", 100)
      .field("price", 25.99)
      .field("location", 1)
      .attach(
        "file",
        fs.readFileSync(path.join(__dirname, "./image-1701039179697.jpg")),
        "image.jpg"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("name", "Example Event");
        expect(res.body).to.have.property(
          "description",
          "A description of the event."
        );
        done();
      });
  });
});
