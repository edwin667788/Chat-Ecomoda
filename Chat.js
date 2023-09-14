
// primer codigo

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    socket.username = username;
    io.emit('user joined', username);
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', { username: socket.username, message });
  });

  socket.on('disconnect', () => {
    io.emit('user left', socket.username);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
         