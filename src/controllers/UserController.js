import { MidUser } from '../models/middle';

class UserController {
    async Register(req, res) {
        const userRegister = req.body;
        return await MidUser.Register(userRegister);
    }

    async Authentication(req, res) {
        const { email, password } = req.body;

        return await MidUser.Authentication(email, password);
    }

    async getUserInfo(req, res) {
        let { userData } = req;

        return userData;
    }

    async getUserToChat(req, res) {
        let { userData } = req;

        if(!userData){
            throw new Error('Vui lòng đăng nhập');
        }

        return MidUser.getUserToChat();
    }
}

export default new UserController();