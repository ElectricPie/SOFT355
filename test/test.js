var assert = require("chai").assert;
var io = require('socket.io-client');

var lobbyFunc = require("../Lobby");

suite("Lobby test suite", function() {
  test("Test Player Creatation", function() {
    //Creates a socket for the player
    var socket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0,
      'reopen delay' : 0,
      'force new connection' : true
    });

    //Creates the player
    var player = new lobbyFunc.Player("Bob", socket);

    //Checks player name are the same
    assert.equal("Bob", player.getName(), "Wrong Name Returned");
    //Checks sockets are the same
    assert.equal(socket, player.getSocket(), "Wrong Name Returned");
  }); 

  test("Test Lobby Creation", function() {
    //Creates a socket for the player
    var hostSocket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0,
      'reopen delay' : 0,
      'force new connection' : true
    });
  
    //Creates the player
    var host = new lobbyFunc.Player("Alan", hostSocket);

    var lobby = new lobbyFunc.Lobby(host);
  
    assert.equal(host, lobby.getHost(), "Wrong Host Returned");
  });
});