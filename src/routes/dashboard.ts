import { Router } from 'express';
import verifyToken from '../services/verifyToken';

const dashboardRouter = Router();

// This is a protected route.
dashboardRouter.get(`/`, verifyToken, (req, res) => {
  res.json({ msg: `You've entered the dashboard.` });
});

export default dashboardRouter;
