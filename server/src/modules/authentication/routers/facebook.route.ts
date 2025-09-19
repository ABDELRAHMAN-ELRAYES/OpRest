import passport from '../../../middlewares/o-authorization';
import {Router } from 'express';
import { oAuthorizationHandler } from '../authentication.controller';

const facebookRouter = Router({ mergeParams: true });

facebookRouter.route('/').get(
  passport.authenticate('facebook', {
    scope: ['email'],
    session: false,
  })
);
facebookRouter.route('/callback').get(
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  oAuthorizationHandler('facebook')
);
export default facebookRouter;
