var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email', email);
});

socket.on('newMessage', function (newMessage) {
  console.log('newMessage', newMessage);

  $('#messageList').append(`<li> from : ${newMessage.from }  ${newMessage.text}</li>`)




})

$('#messageForm').on('submit', function (e) {

  e.preventDefault();

  socket.emit('createMessage', {

    from: 'User',
    text: $('#messageBox').val()
  }, function (ack) {
    console.log('Acknowledgement ' + ack);
    $('#messageBox').val('');
  })

})