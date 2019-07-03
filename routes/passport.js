import passport from 'passport';
import passportLocal from 'passport-local';
import {
  ExtractJwt as JwtExtract,
  Strategy as JwtStrategy,
} from 'passport-jwt';
import bcrypt from 'bcrypt';
import Attendant from '../models/attendant';
import Company from '../models/company';

passport.serializeUser((user, done) => {
  done(undefined, user.id);
});


passport.use(
  'attendantLogin',
  new passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, next) => {
    const user = await Attendant.find({
      username,
    }).then(newUser => newUser[0]);

    if (!user) {
      return next(null, false, {
        message: 'there was no user',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password).then(match => match);

    if (!isMatch) {
      return next(null, false, {
        message: 'there was no match',
      });
    }

    return next(null, user);
  }),
);
passport.use(
  'companyLogin',
  new passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, next) => {
    const user = await Company.find({
      username,
    }).then(newCompany => newCompany[0]);

    if (!user) {
      return next(null, false, {
        message: 'there was no user',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password).then(match => match);

    if (!isMatch) {
      return next(null, false, {
        message: 'there was no match',
      });
    }

    return next(null, user);
  }),
);


passport.use(
  new JwtStrategy({
    secretOrKey: 'secretkey',
    jwtFromRequest: JwtExtract.fromUrlQueryParameter('token'),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }),
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

export default passport;
