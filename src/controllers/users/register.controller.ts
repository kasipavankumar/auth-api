import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../../models/User';
import { userRegistered } from '../../utils/users/helpers';
import { validateRegistrationCredentials } from '../../services/validation';

const handleUserRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const validationError = validateRegistrationCredentials(req.body).error;

  if (validationError) {
    return res.status(400).send(validationError.details[0].message);
  }

  if (await userRegistered(email)) {
    return res.status(400).send(`USER_REGISTERED`);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.send({ user: newUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default handleUserRegister;
