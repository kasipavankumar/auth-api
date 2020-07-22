import { Router } from 'express';

import handleUserLogin from '../controllers/users/login.controller';
import handleUserRegister from '../controllers/users/register.controller';

const usersRoute: Router = Router();

usersRoute.post(`/login`, handleUserLogin);
usersRoute.post(`/register`, handleUserRegister);

export default usersRoute;
