const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new User Has joined New user!!',
    createdAt : new Date().getTime()
    
  });

  socket.on('createMessage', (newMesssage) => {

    console.log('New Message has come!!',newMesssage);
  
    socket.broadcast.emit('newMessage',{
      from : newMesssage.from,
      text : newMesssage.text,
      createdAt : Date.now()
    })

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