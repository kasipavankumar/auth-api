import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import User, { IUser } from '../models/User';
import { PassportStatic } from 'passport';

const LocalStrategy = passportLocal.Strategy;

const initialize = (passport: PassportStatic) => {
  const authenticateUser = async (
    email: string,
    password: string,
    done: (...args: any[]) => any
  ) => {
    try {
      const user = await User.findOne({ email });

      // No user found.
      if (!user) {
        return done(null, false, { msg: `USER_NOT_FOUND` });
      }

      // Check for password validity.
      const passwordValid = bcrypt.compare(password, user.password);

      // Invalid password.
      if (!passwordValid) {
        return done(null, false, { msg: `INVALID_PASSWORD` });
      }

      // Valid user.
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: `email` }, authenticateUser));
  passport.serializeUser<any, any>((user: IUser, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

export default initialize;
