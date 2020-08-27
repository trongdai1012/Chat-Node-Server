const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const socketConnect = (io) => {
    io.on('connect', (socket) => {
        socket.on('join', ({ name, room }, callback) => {
            room = room.trim().toLowerCase();
            const { error, user } = addUser({ id: socket.id, name, room });

            console.log('user', user)

            if (error) return callback(error);

            socket.join(user.room);

            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const { user, error } = getUser(socket.id);

            if (error) return callback(error);

            io.to(user.room).emit('message', { user: user.name, text: message });
        });

        socket.on('disconnect', () => {
            const user = removeUser(socket.id);

            if (user) {
                io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            }
        })
    });
};

module.exports = { socketConnect };