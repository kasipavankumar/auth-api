import { Router } from 'express';
import passport from 'passport';

import verifyToken from '../services/verifyToken';
import { verifyUser } from '../services/authenticate';

const dashboardRouter = Router();

// This is a protected route.
dashboardRouter.get(`/`, passport.authenticate('jwt'), (req, res) => {
  res.json({ msg: `You've entered the dashboard.` });
});

export default dashboardRouter;
