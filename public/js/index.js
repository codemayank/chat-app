let socket = io();
//connect is the built in event on server.js
socket.on('connect', function(){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});


socket.on('message', function(message){
  console.log('message', message);
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  console.log('message', message);
  let li = $('<li></li>');
  let a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
})
//event emitter with callback to receive the acknowledgement that the server has received the message successfully.
socket.emit('createMessage', {
  from : 'Mayank',
  text : 'hi'
}, function(data){
  console.log('got it', data);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text : $('[name = message]').val()
  }, function(){

  })
})

let locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported for your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    console.log(position);
  }, function(){
    alert('Unable to fetch location')
  })
})
