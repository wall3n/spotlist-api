# Spotlist Technical documentation

Spotlist is an free open sourrce plattform builted for indy artists who want to receibe better treatment, this app is an built-in API designed in Javascript to run on any device.

## Getting started

To run this project is necesary to have installed `node`, for precising the `node` version used to build the app is `v16.13.0` which loads `npm` `8.5.3`.

After downloading the repo to deploy the app on a development enviroment just run `npm run deploy`, and the API will be deployed on your `localhost:4000`. To run the pre-built test you just run `npm test`.

See [Api documentation](#Api-reference) for the use of the API.

## Features

This project has been built-in Javascript and Express as the main library, using also custom middlewares coded by this team, and importing bodyParser.

Appart from the technologies this API has been secured by a basic http auth schema, to separate the acces to diferent profiles

## Api reference

To show technically al the routes and its references see the [swagger.yaml](/doc/swagger.yaml)

### /user/:userId/lists

This routes allows a post petition to create a list, it consumes JSON formatt with the songs into an array. *See the example below*
```
{
    "songs": [
        {
            "title": "example",
            "artist": "example artist"
        }
    ] 
}
```
If the the request was successfull it will return 200 status and the list with it's unique id, otherwise it will return 400 if the request body was wrong or 401 if you arent authenticated.

This also accepts a get request which returns an array with all your created lists, this need to be authenticated.

### /user/:userId/lists/:listId

This routes only accepts a get request used to obtain the object of the desired playlist searched by its id, wich contains the id, and the songs packed into an array. This will have the authentication, it will return a status 200 if it's successfull, however it will return 400 if the `userId` or the `listId` are wrong. Appart it will return 401 status if the authentication fails.

### /user/:userId/lists/:listId/songs

This route is used to post a song into a specific list by a post request who consumes an aobject with the title and the artist of the song, in JSON formatt. *See the example below*
```
{
    "title": "example",
    "artist": "example"
}
```
If everything is fine you will receive status 200 and the song you posted, if any searched params is incorrect you will receive a status 400, however if you are unthenticated you will receive statu 401.

## Internal Flow

Builded using CommonJs, this api is structured in a central module who control the routes and the main flow, and then a folder with the custom middlewares which manages the errors and the authentication.
