var http = require("http"); 
var fs = require("fs");

var port = 9000;

var server = http.createServer(function(request, response) {
     fs.readFile("trains.json", function(err, contents) { 
        response.write("Hello World!"); 
        response.end(); 
    }); 
});

server.listen(port, function() {
    console.log("Listening on " + port); 
});
