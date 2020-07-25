import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt, { StrategyOptions } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';

dotenv.config();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

const SECRET_KEY = process.env.JWT_TOKEN_SECRET || ``;

const authenticateUser = (email: string, password: string, done: (...args: any[]) => any): void => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }

    // User not found.
    if (!user) {
      return done(null, false, { msg: `USER_NOT_FOUND` });
    }

    // Check for password validity.
    bcrypt.compare(password, user.password, (err: Error, passwordValid: boolean) => {
      if (err) {
        return done(err);
      }

      return passwordValid ? done(null, user) : done(null, false, { msg: `INVALID_PASSWORD` });
    });
  });
};

const local = passport.use(new LocalStrategy({ usernameField: `email` }, authenticateUser));
passport.serializeUser((user: IUser, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const getToken = (user: any): string => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: 36 });
};

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtPassport = passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    User.findById({ _id: jwtPayload._id })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

const verifyUser = passport.authenticate(`jwt`, { session: false });

export { local, getToken, jwtPassport, verifyUser };
