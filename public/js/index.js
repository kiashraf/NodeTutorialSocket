var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
  socket.emit('createMessage', {
    from: 'KIA',
    text: 'Hello from Hell'
  }, function (acknowledgement) {
    console.log('Acknowledgement : ', acknowledgement);
  })

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email', email);
});

socket.on('newMessage', function (newMessage) {
  console.log('newMessage', newMessage);
})

