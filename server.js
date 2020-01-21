
//Node packages
var app = require("express")();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var path = require('path');

//Custom packages
var lobbyFunc = require('./Lobby');

var port = 9000;
var lobbies = [];
var players = [];

//Lobby socket
const lobbyListSocket = io.of('/lobbies');


//Page requests
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/mainMenu.html'));
});


app.get('/joinPage', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/joinGame.html'));
});

app.get('/hostLobby', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/gameLobby.html'));
});

//Socket
lobbyListSocket.on('connection', function(socket){
  socket.on('disconnect', function(){    
    //Looks through the list of players and removes the socket that has disconected
    for (let i = 0; i < players.length; i++) {
      if (players[i].getSocket() == socket) {
        console.log("Number of lobbies: " + lobbies.length);
        //Checks if the player is host a lobby and if they are, removes the lobby
        for (let j = 0; j < lobbies.length; j++) {
          if (players[i] == lobbies[j].getHost()) {
            lobbies.splice(j, 1);
            console.log(lobbies.length);
          }
        }
        players.splice(i, 1);
      }
    }

    
  });

  socket.on('register user', function (msg) { 
    var newPlayer = new lobbyFunc.Player(msg.name, socket);

    players.push(newPlayer);   
  });

  socket.on('join room', function (msg) { 
    if (msg.room == "lobbySearch") {
      socket.join('lobbySearch');
    }
    else if (msg.room == "newLobby") {
      var host = null;
      
      //Gets the host player mathing the socket
      for (let i = 0; i < players.length; i++) {
        if (socket == players[i].getSocket()) {
          host = players[i];
        }
      }

      //Creates the new lobby
      let newLobby = new lobbyFunc.Lobby(host);

      //Loops until a generated code does not match
      while (checkForDuplicateCode(newLobby)) {
        newLobby.generateNewLobbyCode();
      }
      console.log("New Lobby");
      lobbies.push(newLobby);

      socket.join('lobby' + newLobby.getLobbyCode());

      socket.emit('lobbies', { type: "code", lobbyCode: newLobby.getLobbyCode()});
    }
  });
});

function checkForDuplicateCode(lobby) {
  for (let i = 0; i < lobbies.length; i++) {
    console.log(lobby.getLobbyCode() + " vs " + lobbies[i].getLobbyCode());
    if (lobby.getLobbyCode() == lobbies[i].getLobbyCode()) {
      return true;
    }
  }

  return false;
}

http.listen(port, function() {
    console.log("Listening on: " + port);
});
