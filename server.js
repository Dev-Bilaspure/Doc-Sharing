const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require('./utils/users');

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        console.log(socket.id + 'dddd');
        const user = userJoin(socket.id, username, room);
        console.log(user);
        socket.join(user.room);
        socket.emit('alertUser', 'Welcome to FakeGoogleDoc'); 
        socket.broadcast.to(user.room).emit('alertUser', `${username} has joined the chat`);
    
        //Send users and room info to update the current users list
        console.log("userRoom hai: " + user.room);
        
        io.to(user.room).emit('roomUsers', {
          room: user.room, 
          users: getRoomUsers(user.room)
        })

    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);  
        const obj = {
          userKaNaam: user.username,
          msg
        }
        io.to(user.room).emit('message', obj);
    })

    socket.on('disconnect', () => { 
        const user = userLeave(socket.id);

        if(user) {
          console.log("hojahojaohiija");
          // io.to(user.room).emit('alterUser', `${user.username} has left the chat`);
          socket.broadcast.to(user.room).emit('alertUser', `${user.username} has left the chat`);

          //Send users and room info to update the list of current users
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          })

        }
        
        
    })

})

server.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
})