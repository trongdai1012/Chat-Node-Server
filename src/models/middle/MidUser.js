import { User } from '../cores';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encryptors';
import { generateToken } from '../../libs/token';

class MidUser {
    async GetUser(mobile, password) {
        return User.findOne({
            where: {
                mobile,
                password
            }
        })
    }

    async GetUserById(id) {
        return User.findOne({
            where: {
                id,
                del: 0
            }
        })
    }

    async Register(userRegister) {

        let user = await this.CheckUserExist(userRegister.mobile, userRegister.email);

        if (user) {
            throw new Error('Email hoặc số điện thoại đã tồn tại');
        }

        userRegister.password = hashPassword(userRegister.password);

        return User.create(userRegister);
    }

    async Login(mobile, password) {
        return User.findOne({
            where: {
                [Op.or]: [{
                    mobile
                }, { email }],
                password
            }
        });
    }

    async Authentication(email, password) {

        if (!email) {
            throw new Error('Email không hợp lệ');
        }

        if (!password) throw new Error('Mật khẩu không hợp lệ');

        const userData = await this.GetUserByEmail(email);

        if (!userData) throw new Error('Người dùng không tồn tại');

        const isCorrectPassword = await checkPassword(password, userData.password);

        if (!isCorrectPassword) throw new Error('Sai mật khẩu');

        const token = await generateToken({ userId: userData.id, email });

        return { token };
    }

    async GetUserIsValid(email, password) {
        return User.findOne({
            where: {
                [Op.or]: [{
                    email
                }, {
                    mobile: email
                }],
                password,
                del: 0
            }
        })
    }

    async GetUserByEmail(email) {
        return await User.findOne({
            where: {
                email,
                del: 0
            }
        })
    }

    async CheckUserExist(mobile, email) {
        return User.findOne({
            where: {
                [Op.or]: [{
                    mobile
                }, { email }]
            }
        })
    }

    async getUserToChat(){
        return User.findAll({
            where: {
                del: 0
            }
        })
    }
}

export default new MidUser;