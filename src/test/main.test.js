const chai = require("chai")
const chaiHttp = require("chai-http")
const api = "http://localhost:4000"

chai.use(chaiHttp)

describe('Post a song', () => {
    it('should return 401 when user is unauthenticated', (done) => {
        chai.request(api)
            .post("/users/1/lists/5/songs")
            .send({
                name: "powerlist",
                description: "My playlist",
                songs: ["Oh mama", "mama mia"]
            })
            .end((err, res) => {
                if(err){
                    throw err
                }
                chai.expect(res).to.have.status(401)
                done()
            })
             
    });
});
