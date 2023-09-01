'use strict';

const config = require('../config/index');
const passport = require('passport');
const express = require('express');
const auth = require('../components/auth');
const log = require('../components/logger');
const { v4: uuidv4 } = require('uuid');
const { getSessionUser } = require('../components/utils');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: ['/callback_bceid', '/login', '/logout', '/refresh', '/token'],
  });
});

function addOIDCRouterGet(strategyName, callbackURI, redirectURL) {
  router.get(
    callbackURI,
    passport.authenticate(strategyName, {
      failureRedirect: 'error',
    }),
    (_req, res) => {
      res.redirect(redirectURL);
    }
  );
}

addOIDCRouterGet(
  'oidcBceidActivateUser',
  '/callback_activate_user',
  `${config.get('server:frontend')}/user-activation`
);
addOIDCRouterGet(
  'oidcBceidActivateDistrictUser',
  '/callback_activate_district_user',
  `${config.get('server:frontend')}/district-user-activation`
);

router.get(
  '/callback_bceid',
  passport.authenticate('oidcBceid', {
    failureRedirect: 'error',
  }),
  async (req, res) => {
    const userInfo = getSessionUser(req);
    const accessToken = userInfo.jwt;
    const digitalID = userInfo._json.digitalIdentityID;
    const correlationID = req.session?.correlationID;
    log.info(
      'auth | callback_bceid | dynamic conatct id = ',
      userInfo.dynamicContactId
    );
    if (req.session) {
      req.session.accessToken = accessToken;
      req.session.digitalID = digitalID;
      req.session.correlationID = correlationID;
      req.session.dynamicContactId = userInfo.dynamicContactId;
    }
    if (req.user && !req.user.dynamicContactId) {
      req.user.dynamicContactId = userInfo.dynamicContactId;
    }
    res.redirect(config.get('server:frontend'));
  }
);
//a prettier way to handle errors
router.get('/error', (_req, res) => {
  res.redirect(config.get('server:frontend') + '/login-error');
});

function addBaseRouterGet(strategyName, callbackURI) {
  router.get(
    callbackURI,
    passport.authenticate(strategyName, {
      failureRedirect: 'error',
    })
  );
}

addBaseRouterGet('oidcBceid', '/login_bceid');
addBaseRouterGet('oidcBceidActivateUser', '/login_bceid_activate_user');
addBaseRouterGet(
  'oidcBceidActivateDistrictUser',
  '/login_bceid_activate_district_user'
);

//removes tokens and destroys session
router.get('/logout', async (req, res, next) => {
  console.log('!@#%!#$^!#$^ LOGOUT CALLED ^%@$%&@%&@$%');
  console.log('!#$^!#$^@$%^ req.query $#^!#$^!@%^', req.query);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    const logoutURL = config.get('logoutEndpoint');
    let retUrl;
    if (req.query && req.query.sessionExpired) {
      retUrl =
        logoutURL +
        '?post_logout_redirect_uri=' +
        config.get('server:frontend') +
        '/session-expired';
    } else if (req.query && req.query.loginError) {
      retUrl =
        logoutURL +
        '?post_logout_redirect_uri=' +
        config.get('server:frontend') +
        '/login-error';
    } else if (req.query && req.query.loginBceid) {
      retUrl =
        logoutURL +
        '?post_logout_redirect_uri=' +
        config.get('server:frontend') +
        '/api/auth/login_bceid';
    } else {
      retUrl =
        logoutURL +
        '?post_logout_redirect_uri=' +
        config.get('server:frontend') +
        '/logout';
    }
    log.info('Logout redirection: ', retUrl);
    const redirectURL = encodeURIComponent(retUrl);
    res.redirect(config.get('siteMinder_logout_endpoint') + redirectURL);
  });
});

const UnauthorizedRsp = {
  error: 'Unauthorized',
  error_description: 'Not logged in',
};

//refreshes jwt on refresh if refreshToken is valid
router.post('/refresh', [body('refreshToken').exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const jwt = req.user?.jwt || req.session?.passport?.user?.jwt;
  if (!jwt || typeof jwt !== 'string') {
    log.info('Refresh | No user connected');
    res.status(401).json(UnauthorizedRsp);
  } else {
    if (auth.isTokenExpired(jwt, 'access-token')) {
      log.info('Refresh | Token Expired');
      const refreshToken =
        req.user.refreshToken || req.session?.passport?.user?.refreshToken;
      if (refreshToken && auth.isRenewable(refreshToken, 'refresh-token')) {
        log.info('Refresh | Will try to refresh token');
        return generateTokens(req, res);
      } else {
        log.info('Refresh | Token & refresh token both expired');
        res.status(401).json(UnauthorizedRsp);
      }
    } else {
      const responseJson = {
        jwtFrontend: req.user.jwtFrontend || req.session?.passport.jwtFrontend,
      };
      return res.status(200).json(responseJson);
    }
  }
});

//provides a jwt to authenticated users
router.get('/token', auth.refreshJWT, (req, res) => {
  if (req?.user && req.user?.jwtFrontend && req.user?.refreshToken) {
    if (req.session?.passport?.user?._json) {
      const correlationID = uuidv4();
      req.session.correlationID = correlationID;
      const correlation = {
        user_guid: req.session?.passport?.user?._json.user_guid,
        correlation_id: correlationID,
        dynamicContactId: req.session.dynamicContactId,
        preferred_username:
          req.session?.passport?.user?._json.preferred_username,
      };
      log.info(
        'token | created correlation id and stored in session',
        correlation
      );
    }
    const responseJson = {
      jwtFrontend: req.user.jwtFrontend,
    };
    res.status(200).json(responseJson);
  } else {
    res.status(401).json(UnauthorizedRsp);
  }
});
async function generateTokens(req, res) {
  const refreshToken =
    req.user?.refreshToken || req.session?.passport?.user?.refreshToken;
  const result = await auth.renew(refreshToken);
  if (result && result.jwt && result.refreshToken) {
    req.user.jwt = result.jwt;
    req.user.refreshToken = result.refreshToken;
    req.user.jwtFrontend = auth.generateUiToken();
    if (req.passport?.session?.user) {
      req.passport.session.user.jwt = result.jwt;
      req.passport.session.user.refreshToken = result.refreshToken;
      req.passport.session.user.jwtFrontend = req.user.jwtFrontend;
    }
    const responseJson = {
      jwtFrontend: req.user.jwtFrontend,
    };
    log.info('generateTokens | Refresh | Success');
    res.status(200).json(responseJson);
  } else {
    res.status(401).json(UnauthorizedRsp);
  }
}
router.get(
  '/user-session-remaining-time',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req?.session?.cookie && req?.session?.passport?.user) {
      const remainingTime = req.session.cookie.maxAge;
      log.info(
        `session remaining time is :: ${remainingTime} for user`,
        req.session?.passport?.user?.displayName
      );
      return res.status(200).json(req.session.cookie.maxAge);
    } else {
      return res.sendStatus(401);
    }
  }
);

//redirects to the SSO login screen
router.get(
  '/login',
  passport.authenticate('oidcBceid', {
    failureRedirect: 'error',
  })
);
module.exports = router;
