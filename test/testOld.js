/*
var assert = require('assert');
var Lobby = require('../Lobby.js');
var io = require('socket.io-client');

describe('Lobbies', function() {
  var playerOne

  
  beforeEach(function() {
    var socketTwo = io.connect('http://localhost:9000', {
            'reconnection delay' : 0,
            'reopen delay' : 0,
            'force new connection' : true
    });

    var playerTwo = new Lobby.Player("Test Player 2", socketTwo);
  });
  

  describe('Create Player', function() {
    var playerUsername = "Test Player 1";

    var socketOne = io.connect('http://localhost:9000', {
            'reconnection delay' : 0,
            'reopen delay' : 0,
            'force new connection' : true
    });

    playerOne = new Lobby.Player(playerUsername, socketOne);

    it('should match \'' + playerUsername + '\' and match sockets', function() {
      assert.equal(playerOne.getName(), playerUsername);
      assert.equal(playerOne.getSocket(), socketOne);
    });
  });

  describe('Create Lobby', function() {
    var testLobby = new Lobby.Lobby(playerOne);

    console.log("Test");

    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
*/