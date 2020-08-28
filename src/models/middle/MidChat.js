import { Message, ChatRoom, UserRoom } from './../cores';
import { MidUser } from '.';
import { generateRandomCode } from '../../libs/random';

class MidChat {
    async NewChatRoom(userId, userInviteId) {
        let checkUserExist = await MidUser.GetUserById(userInviteId);

        if (!checkUserExist) throw new Error('ID người dùng không tồn tại');

        let randomCode = generateRandomCode('ROOM-', 10);
        console.log('randomCode', randomCode)
        let chatRoom = await ChatRoom.create({
            del: 0,
            code: randomCode,
            name: 'Room-' + userId + '-' + userInviteId
        });

        await UserRoom.create({
            userId: userId,
            roomId: chatRoom.id,
            del: 0
        });

        await UserRoom.create({
            userId: userInviteId,
            roomId: chatRoom.id,
            del: 0
        });

        return chatRoom;
    }

    async GetMessageByRoomId(roomId, page) {
        let limit = 20;

        page = page ? page : 1;

        let includeOpt = [{
            association: 'userInfo',
            required: true,
            attributes: ['id', 'name', 'avatar']
        }]

        return Message.findAndCountAll({
            where: {
                roomId,
                del: 0
            },
            limit,
            offset: (page - 1) * limit,
            order: [["createdAt", "DESC"]],
            include: includeOpt
        })
    }

    async NewMessage(message) {
        message.del = 0;

        return Message.create(message);
    }

    async AddUserToRoom(userId, roomId) {
        return UserRoom.create({
            roomId,
            userId,
            del: 0
        })
    }

    async GetRoomByCode(code) {
        return ChatRoom.findOne({
            where: {
                code
            }
        })
    }

    async GetUserInRoom(roomId) {
        return UserRoom.findAll({
            where: {
                roomId
            }
        })
    }

    async GetRoomByUser(userId) {
        let includeOpt = [{
            association: 'userRoom',
            required: true,
            where: {
                userId
            },
            include: [{
                association: 'userInfo',
                required: true
            }]
        }, {
            association: 'messages',
            required: false,
            limit: 1,
            order: [["createdAt", "DESC"]]
        }]

        return ChatRoom.findAll({
            where: {
                del: 0
            },
            include: includeOpt
        })
    }
}

export default new MidChat;