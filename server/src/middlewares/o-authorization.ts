import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../config/config';
import AuthenticationService from '../modules/authentication/authentication.service';

// Setup Strategy for OAUTH with GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID: config.oauth.google.clientId,
      clientSecret: config.oauth.google.secret,
      callbackURL: config.oauth.google.callbackURL,
    },
    AuthenticationService.oAuthHandler
  )
);
// Setup Strategy for OAUTH with FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: config.oauth.facebook.appId,
      clientSecret: config.oauth.facebook.appSecret,
      callbackURL: config.oauth.facebook.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
    },
    AuthenticationService.oAuthHandler
  )
);
export default passport;
