const chai = require("chai")
const chaiHttp = require("chai-http")
const api = "http://localhost:4000"

chai.use(chaiHttp)

describe('Post a list and load it', () => {
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
            .post("/users/aaaa01/lists/")
            .auth('Laurel Fitz', 'abcdef1234')
            .send({
                songs: [
                    {
                        title: "aloja",
                        artist: "bele"
                    }
                ]
            })
            .end((err, res) => {
                if(err) throw err
                chai.expect(res).to.have.status(200)
                chai.request(api)
                    .get("/users/aaaa01/lists")
                    .auth("Laurel Fitz", "abcdef1234")
                    .end((err, res) => {
                        if(err) throw err
                        chai.expect(res.body[0]).to.have.property("id").to.be.equal(1)
                        done()
                    })
            })
    })
    it('should load a list by its id', (done) => {
        chai.request(api)
            .get('/users/aaaa00/lists/1')
            .auth('Jhon Smith', "unsecuredpassword1234")
            .end((err, res) => {
                if(err) throw err
                chai.expect(res.body).to.have.property("id").to.be.equal(1)
                done()
            })
    })
});

describe('post a song', () => {
    it('should post a song if the user and the listid is correct' ,(done) => {
        chai.request(api)
            .post('/users/aaaa00/lists/1/songs')
            .auth('Jhon Smith', 'unsecuredpassword1234')
            .send({ song: {
                title: "Cayo la noche - Remix",
                artist: "Quevedo"
            } })
            .end((err, res) => {
                if(err) throw err
                chai.expect(res).to.have.status(200)
                chai.request(api)
                    .get('/users/aaaa00/lists/1')
                    .auth('Jhon Smith', 'unsecuredpassword1234')
                    .end((err, res) => {
                        if(err) throw err
                        chai.expect(res.body.songs[1].title).to.be.equal("Cayo la noche - Remix")
                        done()
                    })
            })
    })
})
