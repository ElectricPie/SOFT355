var express = require("express");
var app = express();

var path = require('path');

var port = 9000;

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/webPages/mainMenu.html'));
});

app.get('/joinPage', function(request, response){
    //console.log("response");
    response.sendFile(path.join(__dirname + '/webPages/joinGame.html'));
});

app.listen(port, function() {
    console.log("Listening on " + port); 
});