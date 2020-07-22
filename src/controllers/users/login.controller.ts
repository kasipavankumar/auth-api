import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../../models/User';
import { validateLoginCredentials } from '../../services/validation';

const handleUserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error } = validateLoginCredentials(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const registeredUser = await User.findOne({ email });

  if (!registeredUser) return res.status(400).send(`USER_NOT_FOUND`);

  const passwordMatches = await bcrypt.compare(password, registeredUser.password);

  if (!passwordMatches) return res.status(401).send(`INVALID_PASSWORD`);

  const token = jwt.sign({ _id: registeredUser._id }, process.env.TOKEN_SECRET || ``);
  res.header('auth-token', token).send(token);
};

export default handleUserLogin;
