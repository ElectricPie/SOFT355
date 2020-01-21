
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
  response.sendFile(path.join(__dirname + '/webPages/gameLobbyHost.html'));
});

app.get('/joinGame', function(request, response) {
  response.sendFile(path.join(__dirname + '/webPages/gameLobby.html'));
});


//Socket
lobbyListSocket.on('connection', function(socket){
  socket.on('disconnect', function(){    
    //Looks through the list of players and removes the socket that has disconected
    for (let i = 0; i < players.length; i++) {
      if (players[i].getSocket() == socket) {
        //Checks if the player is host a lobby and if they are, removes the lobby
        for (let j = 0; j < lobbies.length; j++) {
          if (players[i] == lobbies[j].getHost()) {
            lobbies.splice(j, 1);
            //Updates clients of the removed lobby
            updateLobbySearch(players[i].getSocket(), true);
          }
        }

        var connectedLobby = players[i].getConnectedLobby();

        if (connectedLobby != null) {
          var connectedCode = players[i].getConnectedLobby().getLobbyCode();
          players[i].disconnectFromLobby();
          updateLobby(socket, connectedCode, true);
        }        

        //Removes the player from the player list
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

      updateLobbySearch(socket, false);
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
      lobbies.push(newLobby);

      socket.join('lobby' + newLobby.getLobbyCode());

      //Sends the lobby code to the host
      socket.emit('lobbies', { type: "code", lobbyCode: newLobby.getLobbyCode()});
      
      updateLobbySearch(socket, true);
    }
    else if (msg.room == "existingLobby") {
      //Leaves the search room
      socket.leave("lobbySearch");

      //Joins the socket to the lobby specific room
      socket.join("lobby" + msg.lobbyCode);

      joinLobby(socket, msg.lobbyCode);

      updateLobby(socket, msg.lobbyCode, true);
    }
  });

  //Updates the clients on the given lobby
  socket.on('request update', function(msg) {
    updateLobby(socket, msg.lobbyCode, false);
  });
});

function updateLobby(socket, lobbyCode, sendToAll) {
  for (let i = 0; i < lobbies.length; i++) {
    if (lobbyCode == lobbies[i].getLobbyCode()) {
      var playerList = [];

      playerList.push(lobbies[i].getHost().getName());

      for (let j = 0; j < lobbies[i].getPlayers().length; j++) {
        playerList.push(lobbies[i].getPlayers()[j].getName());
        
      }
      if (sendToAll) {
        socket.to('lobby' + lobbyCode).emit('players', { players: JSON.stringify(playerList) });
      }
      else {
        socket.emit('players', { players: JSON.stringify(playerList) });
      }
    }
  }
}

function joinLobby(socket, lobbyCode) {
  //Finds the lobby with the same code
  for (let i = 0; i < lobbies.length; i++) {
    if (lobbyCode == lobbies[i].getLobbyCode()) {
      //Finds the player matching the socket
      for (let j = 0; j < players.length; j++) {
        if (socket == players[j].getSocket()) {
          //Joins the player to the socket
          lobbies[i].addPlayer(players[j]);
        }
      }
    }
  }
}

function checkForDuplicateCode(lobby) {
  for (let i = 0; i < lobbies.length; i++) {
    if (lobby.getLobbyCode() == lobbies[i].getLobbyCode()) {
      return true;
    }
  }

  return false;
}

function updateLobbySearch(socket, all) {
  var lobbyCodes = [];
  var lobbyPlayers = [];

  for (let i = 0; i < lobbies.length; i++) {
    lobbyCodes.push(lobbies[i].getLobbyCode());
    lobbyPlayers.push(lobbies[i].getPlayers().length);
  }      

  var lobbyCount = lobbyCodes.length;

  if (all == true) {
    socket.broadcast.emit('lobby search', { lobbyCount: lobbyCount, lobbies: JSON.stringify(lobbyCodes), playerCount: lobbyPlayers});
  }
  else {
    socket.emit('lobby search', { lobbyCount: lobbyCount, lobbies: JSON.stringify(lobbyCodes), playerCount: lobbyPlayers});
  }
}

http.listen(port, function() {
    console.log("Listening on: " + port);
});
