module.exports = auth

function auth(block) {
  const { user, password } = block

  const allowedUsers = [
    {
      name: "Jhon Smith",
      passwd: "unsecuredpassword1234"
    },
    {
      name: "Laurel Fitz",
      passwd: "abcdef1234"
    },
    {
      name: "Daniel Schmitz",
      passwd: "qwertyqwerty"
    }
  ]

  const find = allowedUsers.find(allowed => allowed.name === user && allowed.passwd === password)

  if(find){
    return true
  }
}
