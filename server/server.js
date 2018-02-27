
const path = require("path");
const http = require('http');
const express = require("express");
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
//create the websocket server.
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('createMessage', (message)=>{
    console.log('new message', message);
    io.emit('message', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', ()=> {
    console.log('client disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, function(){
  console.log(`server is up on ${port}`);
})
