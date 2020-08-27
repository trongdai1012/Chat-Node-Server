import { checkToken } from '../libs/token';
import { MidUser } from '../models/middle';

export const isAuth = async (req, res, next) => {
    try {
        let { token } = req.headers;

        if (!token) {
            token = req.query.token;
        }
        if (!token) {
            return res.send({
                signal: 0,
                code: 400,
                message: 'Require Authen'
            });
        }

        const dataToken = await checkToken(token);
        if (!dataToken.userId) {
            return res.send({
                signal: 0,
                code: 400,
                message: 'Require Authen'
            });
        }

        req.userToken = dataToken.userId;
        req.userData = await MidUser.GetUserById(dataToken.userId);
        next();
    } catch(err) {
        return res.send({
            signal: 0,
            code: 400,
            message: err.message || err
        });
    }
}