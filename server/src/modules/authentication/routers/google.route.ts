import passport from '../../../middlewares/o-authorization';
import { Router } from 'express';
import { oAuthorizationHandler } from '../authentication.controller';

const googleRouter = Router({ mergeParams: true });

googleRouter.route('/').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

googleRouter.route('/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  oAuthorizationHandler('google')
);
export default googleRouter;
