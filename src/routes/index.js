import { Router } from 'express';
import user from './user';

let routerApp = new Router();

routerApp.use('/user', user);

export default routerApp;