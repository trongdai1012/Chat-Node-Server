import { MidUser } from '../models/middle';

class PersonController {
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
}

export default new PersonController();