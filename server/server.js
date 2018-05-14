const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var generateMessage = require('./utils/Message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Hello New user!!',

  });

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new User Has joined New user!!'));

  socket.on('createMessage', (newMesssage, callback) => {

    console.log('New Message has come!!', newMesssage);

    socket.broadcast.emit('newMessage', generateMessage(newMesssage.from, newMesssage.text));

    callback('Message is received');
    console.log(callback.toString());
  })



  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});