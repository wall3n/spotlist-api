const express = require("express")
const app = express()
const basicAuth = require("./middlewares/basicAuth")
const bodyParser = require("body-parser")

const data = [
  {
    id: "aaaa00",
    playlists: [
   {
        id: 1,
        name: "Example",
        description: "Description example",
        songs: ["Examplesong"]
      }
    ],
    idCounter: 1
  },
  {
    id: "aaaa01",
    playlists: [],
    idCounter: 0
  },
  {
    id: "aaaa02",
    playlists: [],
    idCounter: 0
  }
]

app.use(basicAuth)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/users/:userId/lists', (req, res) => {
  const { name, description, songs } = req.body
  const searchId = req.params.userId[5]

  if(!name || !description || !songs || typeof name !== "string" || typeof description !== "string" || typeof songs !== "object"){
    res.status(400).end("Invalid params")
  }
  data[searchId].playlists.push({
    id: data[searchId].idCounter + 1,
    name: name,
    description: description,
    songs: songs
  })
  data[searchId].idCounter++
  console.log(data[searchId].playlists)
  res.status(200).end(`Your id is ${data[searchId].idCounter}`)
})

app.get('/users/:userId/lists', (req, res) => {
  const searchId = req.params.userId[5]
  res.json(data[searchId].playlists)
})

app.listen(4000, () => {
  console.log("App online")
})
