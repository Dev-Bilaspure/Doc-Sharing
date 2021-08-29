const roomName = document.getElementById('room-name');
const userList = document.getElementById('all-users');
const textArea = document.getElementById('typing');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(username, room);


const socket = io();


socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({room, users}) => {
    //DOM related methods
    console.log("Mai yahan tu kahan");
    outputRoomName(room);
    outputRoomUsers(users);
})

socket.on('alertUser', msg => { 
    // console.log(msg);
    // outputMessage(msg);
    // console.log(username, room);
    // //Scroll down
    // chatMessages.scrollTop = chatMessages.scrollHeight;
    alert(msg);
})

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputRoomUsers(users) {
    console.log("DDDDDDDD: " + users.username);
    userList.innerHTML = `${users.map(user => `<li>> ${user.username}</li>`).join('')}`
}

textArea.addEventListener('input', (e) => {
    socket.emit('chatMessage', e.target.value);
})

socket.on('message', (obj) => {
    console.log(obj.userKaNaam  + " is typing");
    document.getElementById('person-name').innerText = obj.userKaNaam;
    textArea.value=obj.msg;
    
})