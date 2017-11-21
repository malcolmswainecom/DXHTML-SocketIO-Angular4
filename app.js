var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;

app.use(express.static(path.join(__dirname, "src")));

io.on('connection', function(socket){
	console.log('new connection made');

	socket.emit('get-model', 
	 {
	 	data: 
	 	[
	 		{id: 1, text: "Task #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6}, 
	 		{id: 2, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4}
	 	],
	 	links:
	 	[ 
	 		{id: 1, source: 1, target: 2, type: "0"} 
	 	]
	 }
    );

	socket.on('send-model', function(updatedModel){
		console.log(updatedModel);
		socket.broadcast.emit('get-model', updatedModel);
	});
})

server.listen(port, function(){
	console.log("Listening on port " + port);
});

console.log("Node started");