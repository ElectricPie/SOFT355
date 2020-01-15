//Node packages
var app = require("express")();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var path = require('path');

//Custom packages
var Lobby = require('./Lobby');

var port = 9000;
var lobbies = [];
var players = [];

//Temp lobbies
lobbies.push(new Lobby.Lobby("Test Lobby 1"));
lobbies.push(new Lobby.Lobby("Test Lobby 2"));
lobbies.push(new Lobby.Lobby("Test Lobby 3"));


//Page requests
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/mainMenu.html'));
});


app.get('/joinPage', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/joinGame.html'));
});

app.get('/hostLobby', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/gameLobby.html'))
});


//Lobby socket
const lobbyListSocket = io.of('/lobbies');

lobbyListSocket.on('connection', function(socket){
  console.log('user connected to lobbies');

  socket.on('disconnect', function(){    
    //Looks through the list of players and removes the socket that has disconected
    for (let i = 0; i < players.length; i++) {
      if (players[i].getSocket() == socket) {
        players.socket.splice(i, 1);
      }
    }
  });

  socket.on('register user', function (msg) { 
    var newPlayer = new Lobby.Player(msg.name, socket);

    players.push(newPlayer);   
  });
});


http.listen(port, function() {
    console.log("Listening on: " + port);
});
