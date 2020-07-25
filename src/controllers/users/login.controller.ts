import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { getToken } from '../../services/authenticate';
import User from '../../models/User';
import { validateLoginCredentials } from '../../services/validation';
import validateCredentials from '../../services/validateCredentials';

/* const handleUserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const validationError = validateLoginCredentials(req.body).error;

  if (validationError) {
    return res.status(400).send(validationError.details[0].message);
  }

  try {
    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return res.status(400).send(`USER_NOT_FOUND`);
    }

    const passwordMatches = await bcrypt.compare(password, registeredUser.password);

    if (!passwordMatches) {
      return res.status(401).send(`INVALID_PASSWORD`);
    }

    const token = jwt.sign({ _id: registeredUser._id }, process.env.TOKEN_SECRET || ``);
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.error(err);
    return res.status(400).send(`SOMETHING_WENT_WRONG`);
  }
}; */

// If written using composing, the function should be like: validateUser(checkPasswordValidity, checkRegistrationStatus, validateCredentials)
const handleUserLogin = async (req: Request, res: Response) => {
  const validationError = validateLoginCredentials(req.body).error;

  if (validationError) {
    return res.status(400).send(validationError.details[0].message);
  }

  console.log(validateCredentials(`LOGIN`)(req));

  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).send(`USER_NOT_FOUND`);
    }

    bcrypt
      .compare(password, user.password)
      .then((matches) => {
        if (!matches) {
          return res.status(401).send(`INVALID_PASSWORD`);
        }

        const token = getToken({ _id: user._id });
        return res.status(200).json({ msg: `LOGGED_IN`, token });
      })
      .catch((err) => {
        return res.send(400).send(`SOMETHING_WENT_WRONG`);
      });
  });
};

export default handleUserLogin;
