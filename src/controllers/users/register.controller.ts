import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { validateRegistrationCredentials } from '../../services/validation';
import User from '../../models/User';

const handleUserRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { error } = validateRegistrationCredentials(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const emailRegistered = await User.findOne({ email });

  if (emailRegistered) return res.status(400).send(`EMAIL_REGISTERED`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default handleUserRegister;
