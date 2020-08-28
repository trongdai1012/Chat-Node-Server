import { Router } from 'express';
import { UserController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();

routerApp.post('/register', Response(UserController.Register));
routerApp.post('/authentication', Response(UserController.Authentication));
routerApp.get('/userInfo', isAuth, Response(UserController.getUserInfo));
routerApp.get('/getUserToChat', isAuth, Response(UserController.getUserToChat));

export default routerApp;