# Spotlist 

Spotlist is a free open software platform builded for indy musicians who search a better treatment. With this app you can create your own playlist with your favourite songs

## Getting Started

To use this app first you wiil have to deploy into your personal computer to test it. First of all you have to ensure you have downloaded the project and you have installed `node` on your pc.

After that you will have to acess the project folder and deploy the following command
```
npm run deploy
```
Then your app will be deployed in your localhost in the port 4000. To use the app you will have to use an http requester like *postman* or *insomnia*.

## Features

This app has various features to manage your music:
    - [Creating lists](#Creating-a-list)
    - [Get the list of a user](#Getting-all-the-lists-of-a-user)
    - [Get a list by it's unique id](#Getting-a-list-by-id)
    - [Add songs to an especific list](#Add-songs-to-an-especific-user)
All this features ares secured by a basic http authorization request with only let logged user to make changes on it's own profile

### Creating a list

To create a list you should post a request to the following route `/users/:userid/lists` specifying the user id and it's corresponging user and password. 
Your request may include the desired songs to add. You will recive the created list as response

### Getting all the lists of a user

To get a list you will also need to be logged and specifiy the userId in the provided path by a `get` request:  `/user/:userId/lists`.
As a response you will recive all your created lists with it's personal id and all the songs.

### Getting a list by id

To obtain a list by its id you will have to be logged as all the petitions you will make to this app, and place the id in the next path: `/user/:userId/lists/:listId`
Then you will recive the searched list with it's songs described by it's artist and name

### Add songs to an especific user 

To add a song or may songs to a list you will have to make a `post` request to the next path specifying the user id of your session and the listId in the url (`/user/:userId/lists/:listId/songs`). In the body you should specify the artist and the name of the song.

For futher and technichal information you should check the technichal documentation in this document.
