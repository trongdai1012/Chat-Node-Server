import http from 'http';
import app from '../src/app';
require('dotenv').config();
const socketio = require('socket.io');
const {socketConnect} = require('./socket');

const HTTP_PORT = normalizePort(process.env.PORT || 8000);
app.set('port', HTTP_PORT);
const server = http.createServer(app);
const io = socketio(server);
socketConnect(io);

// io.on('connect', (socket) => {
//     socket.on('join', ({ name, room }, callback) => {
//         const { error, user } = addUser({ id: socket.id, name, room });

//         if (error) return callback(error);

//         socket.join(user.room);

//         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//         callback();
//     });

//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id);

//         io.to(user.room).emit('message', { user: user.name, text: message });

//         callback();
//     });

//     socket.on('disconnect', () => {
//         const user = removeUser(socket.id);

//         if (user) {
//             io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//             io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//         }
//     })
// });

server.listen(HTTP_PORT, onListening)

function onListening() {
    let addr = this.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Web server listening on ' + bind);
}

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) return val;

    if (port >= 0) return port;
    return false;
} 