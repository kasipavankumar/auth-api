import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | undefined => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send(`ACCESS_DENIED`);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || ``);

    // req.user
    req.body.user = verified;

    next();
  } catch (err) {
    console.error(`${err}`);
    res.status(400).send(`INVALID_TOKEN`);
  }
};

export default verifyToken;
