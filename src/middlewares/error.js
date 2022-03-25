module.exports = errorHandler

function errorHandler(err, req, res, next){
  const strError = toString(err)
  return res.status(500).json(strError)
}
