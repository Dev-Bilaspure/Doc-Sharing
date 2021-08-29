let users = [];

function userJoin(id, username, room) {
    const newuser = {id, username, room};
    console.log(newuser);
    users.push(newuser);
    console.log(users);
    return(newuser);
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
      return users.splice(index, 1)[0]; 
    }
}

function getRoomUsers(room) {
    // const arr = [];
    // for(let i=0;i<users.length;i++) {
    //     arr.push(JSON.stringify(users[i]));
    // }
    // users=arr;
    return users.filter(user => user.room === room);
}

  
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}