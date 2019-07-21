import * as passport from 'passport';
import {configureAuthenticationTwitter} from './authentication-strategy/twitter';

export function configureAuthentication(app) {
  passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });
  passport.deserializeUser((id, done) => {
    done(null, JSON.parse(id));
  });

  app.use(passport.initialize());
  app.use(passport.session());

  configureAuthenticationTwitter(app);

  const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  return authenticate;
}
