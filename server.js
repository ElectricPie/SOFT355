var express = require("express");
var app = express();

var path = require('path');

var port = 9000;


var Lobby = require('./Lobby');


var lobbies = [];

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/mainMenu.html'));
});

app.get('/joinPage', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/joinGame.html'));
});

app.get('/lobby', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/gameLobby.html'))
});

app.listen(port, function() {
    console.log("Listening on " + port); 
});