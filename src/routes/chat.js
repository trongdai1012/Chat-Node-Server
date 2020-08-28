import { Router } from 'express';
import { ChatController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();

routerApp.get('/getRoom', isAuth, Response(ChatController.GetRoomByUser));
routerApp.get('/newChatRoom', isAuth, Response(ChatController.newChatRoom));
routerApp.get('/getMessageByRoomId', isAuth, Response(ChatController.GetMessageByRoomId));

export default routerApp;