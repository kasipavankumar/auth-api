import { Router, Request, Response } from 'express';
import passport from 'passport';

import handleUserLogin from '../controllers/users/login.controller';
import handleUserRegister from '../controllers/users/register.controller';

const usersRoute: Router = Router();

usersRoute.get(`/`, (req: Request, res: Response) => res.status(200).send(`Welcome!`));
usersRoute.post(`/login`, passport.authenticate('local'), handleUserLogin);
usersRoute.post(`/register`, handleUserRegister);

export default usersRoute;
