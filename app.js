var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


var onlineUsers = [];


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000);

io.sockets.on('connection', function(socket) {

  // send message
  socket.on('send message', function(data) {
    io.sockets.emit('new message', data);
  });

  socket.on('new user', function(data) {
    onlineUsers.push(data);
    io.sockets.emit('new user registered', {usernames: onlineUsers});
  });

});
