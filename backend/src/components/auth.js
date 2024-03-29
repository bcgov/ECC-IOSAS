'use strict';

const axios = require('axios');
const config = require('../config/index');
const log = require('./logger');
const jsonwebtoken = require('jsonwebtoken');
const qs = require('querystring');
const utils = require('./utils');
const HttpStatus = require('http-status-codes');
const safeStringify = require('fast-safe-stringify');
const { ApiError } = require('./error');
const { pick } = require('lodash');

const auth = {
  // Check if JWT Access Token has expired
  isTokenExpired(token, context = 'NA') {
    const now = Date.now().valueOf() / 1000;
    const payload = jsonwebtoken.decode(token);
    log.info('isTokenExpired: context: ', context);
    if (payload['exp']) {
      const expDate = new Date(payload['exp'] * 1000);
      log.info(`isTokenExpired: exp: ${expDate}, now: ${new Date()}`);
    }

    return !!payload['exp'] && payload['exp'] < now + 30; // Add 30 seconds to make sure , edge case is avoided and token is refreshed.
  },

  // Check if JWT Refresh Token has expired
  isRenewable(token, context = 'NA') {
    const now = Date.now().valueOf() / 1000;
    const payload = jsonwebtoken.decode(token);
    if (!payload.iat || typeof payload.iat === 'undefined') {
      log.warn(
        'isRenewable',
        '| The token has no IAT possibly wrong token',
        payload
      );
      return new Error(
        'Unable to process refresh token associated with user, contact key cloak admin'
      );
    }
    const exp =
      payload.exp ||
      payload.iat + (process.env.DEFAULT_SESSION_TIME || 30.0) * 60;
    // log.info('isRenewable', ` | exp: ${exp} | now: ${now} | payload.exp: ${payload.exp} | iat: ${payload.iat}`);
    // Check if expiration exists, or lacks expiration
    return exp > now;
  },

  // Get new JWT and Refresh tokens
  async renew(refreshToken) {
    let result = {};

    try {
      const discovery = await utils.getOidcDiscovery();
      const response = await axios.post(
        discovery.token_endpoint,
        qs.stringify({
          client_id: config.get('oidc:clientId'),
          client_secret: config.get('oidc:clientSecret'),
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          scope: discovery.scopes_supported,
        }),
        {
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      log.info('renew | result: ', utils.prettyStringify(response.data));
      if (
        response &&
        response.data &&
        response.data.access_token &&
        response.data.refresh_token
      ) {
        result.jwt = response.data.access_token;
        result.refreshToken = response.data.refresh_token;
      } else {
        log.error('Access token or refresh token not retreived properly');
      }
    } catch (error) {
      log.error('renew', error.message);
      result = error.response && error.response.data;
    }

    return result;
  },

  // Update or remove token based on JWT and user state
  async refreshJWT(req, _res, next) {
    try {
      if (!!req && !!req.user && !!req.user.jwt) {
        log.info('refreshJWT', 'User & JWT exists');

        if (auth.isTokenExpired(req.user.jwt, 'access-token')) {
          log.info('refreshJWT', 'JWT has expired');

          if (
            !!req.user.refreshToken &&
            auth.isRenewable(req.user.refreshToken, 'refresh-token')
          ) {
            log.info('refreshJWT', 'Can refresh JWT token');

            // Get new JWT and Refresh Tokens and update the request
            const result = await auth.renew(req.user.refreshToken);
            if (result.jwt && result.refreshToken) {
              req.user.jwt = result.jwt; // eslint-disable-line require-atomic-updates
              req.user.refreshToken = result.refreshToken; // eslint-disable-line require-atomic-updates
              if (req.session?.passport?.user) {
                req.session.passport.user.jwt = result.jwt;
                req.session.passport.user.refreshToken = result.refreshToken;
              }
            } else {
              log.error(
                'refreshJWT: Unable to refres token with error: ',
                result
              );
              delete req.user;
            }
          } else {
            log.info('refreshJWT', 'Cannot refresh JWT token');
            delete req.user;
          }
        }
      } else {
        log.info('refreshJWT', 'No existing User or JWT');
        log.info('refreshJWT: user: ', req.user);
        log.info('refreshJWT: user: ', req.session);
        delete req.user;
      }
    } catch (error) {
      log.error('refreshJWT', error.message);
    }
    next();
  },

  generateUiToken() {
    const i = config.get('tokenGenerate:issuer');
    const s = 'user@penrequest.ca';
    const a = config.get('server:frontend');
    const signOptions = {
      issuer: i,
      subject: s,
      audience: a,
      expiresIn: '30m',
      algorithm: 'RS256',
    };

    const privateKey = config.get('tokenGenerate:privateKey');
    const uiToken = jsonwebtoken.sign({}, privateKey, signOptions);
    // log.info('Generated JWT', uiToken);
    return uiToken;
  },

  async getApiCredentials() {
    try {
      const discovery = await utils.getOidcDiscovery();
      const response = await axios.post(
        discovery.token_endpoint,
        qs.stringify({
          client_id: config.get('oidc:clientId'),
          client_secret: config.get('oidc:clientSecret'),
          grant_type: 'client_credentials',
          scope: discovery.scopes_supported,
        }),
        {
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      log.verbose('getApiCredentials Res', safeStringify(response.data));

      let result = {};
      result.accessToken = response.data.access_token;
      result.refreshToken = response.data.refresh_token;
      return result;
    } catch (error) {
      log.error(
        'getApiCredentials Error',
        error.response
          ? pick(error.response, ['status', 'statusText', 'data'])
          : error.message
      );
      const status = error.response
        ? error.response.status
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new ApiError(
        status,
        { message: 'Get getApiCredentials error' },
        error
      );
    }
  },
  isValidBackendToken() {
    return function (req, res, next) {
      const jwt =
        req.user.jwt && typeof req.user.jwt == 'string'
          ? req.user.jwt
          : req.session?.passport?.user?.jwt;
      if (jwt) {
        try {
          utils
            .getOidcDiscovery()
            .then((discovery) => {
              try {
                const publicKey = discovery.realamInfo.public_key;
                const formattedPubKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
                // log.info(`Public key: ${publicKey}`);
                // log.info(`Formatted key: ${formattedPubKey}`);
                jsonwebtoken.verify(jwt, formattedPubKey);
              } catch (e) {
                log.info(
                  'The kc token verification fail with underlying error'
                );
                log.error('error is from verify', e);
                return res.status(HttpStatus.UNAUTHORIZED).json();
              }
              log.info('Backend token is valid moving to next');
              return next();
            })
            .catch((error) => {
              log.error('Unable to get discovery with error: ', error);
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
            });
        } catch (e) {
          log.error('Unable to get discovery with error(1): ', e);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
      } else {
        log.info(req.session);
        log.info('no jwt responding back 401');
        return res.status(HttpStatus.UNAUTHORIZED).json();
      }
    };
  },
};

module.exports = auth;
