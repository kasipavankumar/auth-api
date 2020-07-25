import { Router } from 'express';
import passport from 'passport';

import handleUserLogin from '../controllers/users/login.controller';
import handleUserRegister from '../controllers/users/register.controller';

const usersRoute: Router = Router();

usersRoute.post(`/login`, passport.authenticate('local'), handleUserLogin);
usersRoute.post(`/register`, handleUserRegister);

export default usersRoute;
