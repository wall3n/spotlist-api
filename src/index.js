const express = require("express")
const app = express()
const basicAuth = require("./middlewares/basicAuth")
const bodyParser = require("body-parser")
const errorHandler = require("./middlewares/error")

const data = [
  {
    id: "aaaa00",
    playlists: [
   {
        id: 1,
        songs: [
          {
            artist: "Bad Bunny",
            title: "Dakiti"
          }
        ]
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

app.use(errorHandler)
app.use(basicAuth)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/users/:userId/lists', (req, res) => {
  const { songs } = req.body
  const searchId = req.params.userId[5]

  if(!songs || typeof songs !== "object"){
    res.status(400).end("Invalid params")
  }
  data[searchId].playlists.push({
    id: data[searchId].idCounter + 1,
    songs: songs
  })
  data[searchId].idCounter++
  res.json({
    id: data[searchId].idCounter,
    songs: songs
  })
})

app.get('/users/:userId/lists', (req, res) => {
  const searchId = req.params.userId[5]
  res.json(data[searchId].playlists)
})

app.get('/users/:userId/lists/:listId', (req, res) => {
  const searchId = req.params.userId[5]
  const arrayId = req.params.listId - 1
  const search = data[searchId].playlists[arrayId]
  if(typeof search !== "object"){
    return res.status(400).end("Invalid params")
  }
  res.json(search)
})

app.post('/users/:userId/lists/:listid/songs', (req, res) => {
  const { song } = req.body
  const { artist, title } = song
  if(!song || !artist || !title || typeof song !== "object" || typeof artist !== "string" || typeof title !== "string" ){
    return res.status(400).end("Invalid params")
  }

  const searchId = req.params.userId[5]
  const arrayId = req.params.listid - 1
  const search = data[searchId].playlists[arrayId].songs
  if(typeof search !== "object"){
    return res.status(400).end("Invalid params")
  }

  search.push(song)
  res.json(song)
})

app.listen(4000, () => {
  console.log("App online")
})
