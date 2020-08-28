import { MidChat } from '../models/middle';

class ChatController {
    async newChatRoom(req, res) {
        let { userInvitedId } = req.query;
        let { userData } = req;
        if (!userData) throw new Error('Vui lòng đăng nhập');
        return await MidChat.NewChatRoom(userData.id, userInvitedId);
    }

    async GetRoomByUser(req, res) {
        let { userData } = req;

        if (!userData) {
            throw new Error('Vui lòng đăng nhập');
        }

        return await MidChat.GetRoomByUser(userData.id);
    }

    async GetMessageByRoomId(req, res) {
        let { userData } = req;

        if (!userData) {
            throw new Error('Vui lòng đăng nhập');
        }

        let { roomId, page } = req.query;

        return await MidChat.GetMessageByRoomId(roomId, page);
    }
}

export default new ChatController();