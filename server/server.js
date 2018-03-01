
const path = require("path");
const http = require('http');
const express = require("express");
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
//create the websocket server.
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('message', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('message', generateMessage('Admin', 'A New User has joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log('new message', message);
    io.emit('message', generateMessage(message.from, message.text));
    callback('The message was successfully received by the server!');
    socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })
  });

  socket.on('disconnect', ()=> {
    console.log('client disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, function(){
  console.log(`server is up on ${port}`);
})
