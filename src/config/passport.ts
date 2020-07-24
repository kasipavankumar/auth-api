/**
 * https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts
 */
import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';

import User, { IUser } from '../models/User';

const LocalStrategy = passportLocal.Strategy;

const initializePassport = (passport: PassportStatic) => {
  const authenticateUser = (
    email: string,
    password: string,
    done: (...args: any[]) => any
  ): void => {
    User.findOne({ email }, (err, user) => {
      if (err) { return done(err); }

      // User not found.
      if (!user) { return done(null, false, { msg: `USER_NOT_FOUND` }); }

      // Check for password validity.
      bcrypt.compare(password, user.password, (err: Error, passwordValid: boolean) => {
        if (err) { return done(err); }

        return passwordValid ? done(null, user) : done(null, false, { msg: `INVALID_PASSWORD` });
      });
    });
  };

  passport.use(new LocalStrategy({ usernameField: `email` }, authenticateUser));
  passport.serializeUser((user: IUser, done) => done(null, user._id));
  passport.deserializeUser((id, done) => { User.findById(id, (err, user) => { done(err, user); });
  });
};

export default initializePassport;
