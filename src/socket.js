const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
import { MidChat, MidUser } from './models/middle';

const socketConnect = (io) => {
    io.on('connect', async (socket) => {
        await socketJoin(socket, io);
        await socketSendMess(socket, io);
        await socketDisconnect(socket, io);
    });
};

const socketJoin = async (socket, io) => {
    socket.on('join', async ({ userId, roomId }, callback) => {
        const user = await MidUser.GetUserById(userId);

        if (!user) return callback(error);

        socket.join(roomId);

        // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${roomId}.` });
        // socket.broadcast.to(roomId).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(roomId).emit('roomData', { room: roomId, users: getUsersInRoom(roomId) });

        callback();
    });
}

const socketSendMess = async (socket, io) => {
    socket.on('sendMessage', async (message, userId, roomId, callback) => {
        const user = await MidUser.GetUserById(userId);

        if (!user) return callback(error);

        MidChat.NewMessage({ content: message, userId, roomId });

        io.to(roomId).emit('message', { userId: userId, text: message, avatar: user.avatar });
    });
}

const socketDisconnect = async (socket, io) => {
    socket.on('disconnect', async () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
}

module.exports = { socketConnect };