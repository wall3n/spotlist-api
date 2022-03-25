module.exports = auth

function auth(block) {
  const { user, password, reqId } = block

  const allowedUsers = [
    {
      name: "Jhon Smith",
      passwd: "unsecuredpassword1234",
      id: "aaaa00"
    },
    {
      name: "Laurel Fitz",
      passwd: "abcdef1234",
      id: "aaaa01"
    },
    {
      name: "Daniel Schmitz",
      passwd: "qwertyqwerty",
      id: "aaaa02"
    }
  ]

  const find = allowedUsers.find(allowed => allowed.name === user && allowed.passwd === password && allowed.id === reqId)

  if(find){
    return true
  }
}
