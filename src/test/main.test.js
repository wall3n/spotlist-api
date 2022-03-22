const chai = require("chai")
const chaiHttp = require("chai-http")
const api = "http://localhost:4000"

chai.use(chaiHttp)

describe('Post a song', () => {
    it('should return 401 when user is unauthenticated', (done) => {
        chai.request(api)
            .post("/users/1/lists/")
            .end((err, res) => {
                if(err){
                    throw err
                }
                chai.expect(res).to.have.status(401)
                done()
            })
    });
    it('should return 401 if the userId does not exist', () => {
        chai.request(api)
            .post("/users/1/lists/")
            .auth("Jhon Smith", "unsecuredpassword1234")
            .end((err, res) => {
                if(err) throw err
                chai.expect(res).to.have.status(401)
            })

    })
    it('should send 200 when a list is uploaded and load the list', (done) => {
        chai.request(api)
            .post("/users/aaaa00/lists/")
            .auth('Jhon Smith', 'unsecuredpassword1234')
            .send({
                name: "My list",
                description: "Nice description",
                songs: ["Malamente", "Saoko"]
            })
            .end((err, res) => {
                if(err) throw err
                chai.expect(res).to.have.status(200)
                chai.request(api)
                    .get("/users/aaaa00/lists")
                    .auth("Jhon Smith", "unsecuredpassword1234")
                    .end((err, res) => {
                        if(err) throw err
                        chai.expect(res.body[0]).to.have.property("name").to.be.equal("My list")
                        done()
                    })
            })
    })
});
