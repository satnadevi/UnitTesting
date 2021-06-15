const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiNock = require('chai-nock');
const app = require('../index');

chai.use(chaiHttp);
chai.use(chaiNock);
const should = chai.should();


describe("Coba Unit Test", () => {
    describe("Get resources (../api/resources)", () => {
        it("should return status 200 and return error", (done) => {
            chai.request(app)
                .get("/api/resources")
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf.above(0);
                    done()
                });
        });
    });

    describe("Get active resources (../resources/activeresources)", () => {
        it("should return status 200 and return array which the elements status are active", (done) => {
            chai.request(app)
                .get("/api/activeresources")
                .end((_, res) => {
                    res.should.have.status(200);
                    for (object in res.body) {
                        object.status.should.be.eql("active");
                    }
                    done()
                });
        });
    });

    describe("Get by id (../api/resources/:id)", () => {
        it("should return status 200 and return object when id exist", (done) => {
            chai.request(app)
                .get("/api/resources/3")
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done()
                });
        });
        it("should return empty when id does not exist", (done) => {
            chai.request(app)
                .get("/api/resources/8")
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql({});
                    done()
                });
        });
    });

    describe("Post resources (../api/resources)", () => {
        it("should return status 200 and return the resource", (done) => {
            let resource = {
                title: 'String WOI',
                description: 'String WOI',
                link: 'String WOI',
                priority: 12,
                timeToFinish: 21
            }
            chai.request(app)
                .post("/api/resources")
                .send(resource)
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done()
                });
        });
        it("should return status 200 and return resource when post another request", (done) => {
            let resource = {
                title: 'Selamat Pagi',
                description: 'Ucapan Selamat Pagi',
                link: 'Selamat Pagi',
                priority: 13,
                timeToFinish: 22
            }
            chai.request(app)
                .post("/api/resources")
                .send(resource)
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done()
                });
        });
    });

    describe("Patch by id (../api/resources/:id)", () => {
        it("should return status 200 and return the \"Data has been updated\"", (done) => {
            let resource = {
                title: 'String WOI',
                description: 'String WOI',
                link: 'String WOI',
                priority: 12,
                timeToFinish: 21
            }
            chai.request(app)
                .patch("/api/resources/4")
                .send(resource)
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("errors").eql("Data has been updated");
                    done()
                });
        });
    });

    describe("Delete by id (../api/resources/:id", () => {
        it("should return status 200 and return array when id exist", (done) => {
            chai.request(app)
                .delete("/api/resources/3")
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done()
                });
        });
        it("should return status 404 when id does not exist", (done) => {
            chai.request(app)
                .delete("/api/resources/3")
                .end((_, res) => {
                    res.should.have.status(404);
                    done()
                });
        });
    });
});