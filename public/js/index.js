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
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  console.log('message', message);
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  let a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from} ${formattedTime}:`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
})


$('#message-form').on('submit', function(e){
  e.preventDefault();

  let messageTextbox = $('[name = message]');

  socket.emit('createMessage', {
    from: 'User',
    text : messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  })
})

let locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported for your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    console.log(position);
  }, function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location')
  })
})
