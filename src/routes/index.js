import { Router } from 'express';
import user from './user';
import chat from './chat';

let routerApp = new Router();

routerApp.use('/user', user);
routerApp.use('/chat', chat);

export default routerApp;