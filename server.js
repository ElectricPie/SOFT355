//Node packages
var app = require("express")();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var path = require('path');

//Custom packages
var Lobby = require('./Lobby');


var port = 9000;
var lobbies = [];


//Page requests
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/mainMenu.html'));
});


app.get('/joinPage', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/joinGame.html'));
});

app.get('/lobby', function(request, response) {
    response.sendFile(path.join(__dirname + '/webPages/gameLobby.html'))
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(port, function() {
    console.log("Listening on: " + port);
});
