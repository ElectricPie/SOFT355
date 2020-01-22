var assert = require("chai").assert;
var io = require('socket.io-client');

var lobbyFunc = require("../Lobby");
var gameFunc = require("../GameFunctions");

var citiesJson = require('../json/cities');

suite("Lobby test suite", function() {
  suiteSetup(function() {
    sharedHostSocket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    //Creates the player
    sharedHost = new lobbyFunc.Player("John", sharedHostSocket);

    sharedLobby = new lobbyFunc.Lobby(sharedHost);
  });

  test("Test Player Creatation", function() {
    //Creates a socket for the player
    var socket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
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
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });
  
    //Creates the player
    var host = new lobbyFunc.Player("Alan", hostSocket);

    var lobby = new lobbyFunc.Lobby(host);
  
    assert.equal(host, lobby.getHost(), "Wrong Host Returned");
  });

  test("Player joining lobby", function() {
    //Creates a socket for the player
    var hostSocket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });
     
    //Creates the host player
    var host = new lobbyFunc.Player("Alan", hostSocket);

    //Creates a socket for the player
    var socket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    //Creates the player
    var player = new lobbyFunc.Player("Bob", socket);

    var playerLobby = new lobbyFunc.Lobby(host);

    playerLobby.addPlayer(player);

    var playerList = playerLobby.getPlayers();

    assert.equal(1, playerList.length, "Wrong number of players returned");

    var playerInList = false;
    for (let i = 0; i < playerList.length; i++) {
      if (playerList[i] == player) {
        playerInList = true;
      }
    }

    assert.isOk(playerInList, 'Player not found in list');
  });

  test("Lobby code generation", function() {
    //Creates a socket for the player
    var lobbyHostSocket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    var hostName = "Paul";

    //Creates the host player
    var lobbyHost = new lobbyFunc.Player(hostName, lobbyHostSocket);

    var codeLobby = new lobbyFunc.Lobby(lobbyHost);

    var lobbyCode = codeLobby.getLobbyCode();

    assert.equal(lobbyCode.length, 7, "Codes 1st letter should match hosts name 4th letter");
    assert.equal(lobbyCode[0], hostName[3].toUpperCase(), "Codes 1st letter should match hosts name 4th letter");
    assert.equal(lobbyCode[3], hostName[1].toUpperCase(), "Codes 4th letter should match hosts name 2nd letter");
    assert.equal(lobbyCode[4], hostName[0].toUpperCase(), "Codes 5th letter should match hosts name 1st letter");

    codeLobby.generateNewLobbyCode();
    var regenLobbyCode = codeLobby.getLobbyCode();

    assert.notEqual(lobbyCode, regenLobbyCode, "Regenerated codes should not match");
  });

  test("Player leaving lobby", function() { 
    var sharedLobbyCount = sharedLobby.getPlayers().length;

    //Creates the leaver player
    var leaverPlayerSocket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });
    var leaverPlayer = new lobbyFunc.Player("Eric", leaverPlayerSocket);

    //Connect the player to the lobby
    sharedLobby.addPlayer(leaverPlayer);

    leaverPlayer.disconnectFromLobby();

    assert.equal(sharedLobby.getPlayers().length, sharedLobbyCount, "Number of players should match the number of players before adding and leaving the new player");

    assert.equal(leaverPlayer.getConnectedLobby(), null, "Players lobby should be null");
  });
});

suite("Game test suite", function () {
  var testPlayer;
  
  suiteSetup(function() {
    gamePlayerSocket = io.connect('http://localhost:9000', {
      'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    //Creates the player
    gamePlayer = new lobbyFunc.Player("John", gamePlayerSocket);
  });

  test("Create disease", function() {
    var testDiseaseName = "black";

    var testDisease = new gameFunc.Disease(testDiseaseName);

    assert.notEqual(testDisease, null, "Disease should should be null");

    assert.equal(testDisease.getName(), testDiseaseName, "Disease name should match " + testDiseaseName);
  }); 

  test("Create player pawn", function() {
    var testPlayerPawn = new gameFunc.PlayerPawn();

    assert.notEqual(testPlayerPawn, null, "Player pawn should should be null");
  });


  test("Create City", function() {
    var testCityName = "TestCity"
    var testCityConnections = [3, 2];

    var testCity = new gameFunc.City(testCityName, testCityConnections);


    assert.notEqual(testCity, null, "City should should be null");
    assert.equal(testCity.getName(), testCityName, "City name should match " + testCityName);
    assert.equal(testCity.getConnections(), testCityConnections, "City name should match " + testCityConnections);
  });
 
  test("Creating gameworld", function() { 
    var testGameWorld = new gameFunc.GameWorld(citiesJson);
   

    assert.notEqual(testGameWorld, null, "GameWorld should should be null");

    assert.equal(testGameWorld.getCities().length, Object.keys(citiesJson).length, "Number of cities should be " + Object.keys(citiesJson).length);
  });
});