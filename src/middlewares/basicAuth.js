const auth = require("./auth")

module.exports = basicAuth

function basicAuth(req, res, next) {
  if(!req.headers.authorization || req.headers.authorization.indexOf("Basic ") === -1){
    return res.status(401).end("Authentification headers are missing")
  }

  const key = req.headers.authorization.split(" ")[1]
  const decode = atob(key)
  const [user, password] = decode.split(":")
  const validation = auth({user, password})
  if(!validation){
    return res.status(401).end("User or password incorrect")
  }

  next()
}
