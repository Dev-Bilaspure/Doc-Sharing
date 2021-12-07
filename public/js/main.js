const roomName = document.getElementById('room-name');
const userList = document.getElementById('all-users');
const textArea = document.getElementById('typing');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});



const socket = io();


socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({room, users}) => {
    //DOM related methods
    outputRoomName(room);
    outputRoomUsers(users);
})

socket.on('updateTitle', (room) => {
    const currTitle = document.getElementById('titleRoom').innerText;
    if(currTitle === 'SharedDoc')
        document.getElementById('titleRoom').innerText=currTitle + " | " + room;
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
    userList.innerHTML = `${users.map(user => `<li>> ${user.username}</li>`).join('')}`
}

textArea.addEventListener('input', (e) => {
    socket.emit('chatMessage', e.target.value);
})

socket.on('message', (obj) => {
    document.getElementById('person-name').innerText = obj.userKaNaam;
    textArea.value=obj.msg;
    
})