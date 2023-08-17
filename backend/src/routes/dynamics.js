'use strict';

const passport = require('passport');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { default: axios } = require('axios');
const dynamicIntegrationService = require('../components/dynamics-integration');
const auth = require('../components/auth');
const log = require('../components/logger');

const router = express.Router();

const allowedPulicPaths = [
  'Document',
  'EOI',
  'SchoolAuthority',
  'SchoolYear',
  'Metdata',
  'Health',
  'Contact/GetBySchoolAuthority',
];
const allowedProtectedPaths = [];
const allowedPaths = [...allowedPulicPaths, ...allowedProtectedPaths];

const proxyMiddleWare =
  (isSecure = false) =>
  async (req, resp, next) => {
    const path = req.path || '';
    const method = req.method;
    const dynamicConactId = req.session.dynamicContactId;
    if (!dynamicConactId && isSecure) {
      resp.status(HttpStatus.FORBIDDEN).send('Forbiden: No Dynamic ID');
    }
    if (
      !allowedPaths.some((allowedPath) =>
        path.toLowerCase().includes(allowedPath.toLowerCase())
      )
    ) {
      resp
        .status(HttpStatus.FORBIDDEN)
        .send(`Forbiden: The resource ${path} not accissble`);
    }
    log.info(
      `dynamic-middleware | Processsing | Req: [path: ${path}]; method: ${method}`
    );
    try {
      const host = dynamicIntegrationService.host();
      const endpoint = host + '/api' + path;
      const headers = req.headers || {};
      const contentType = headers['Content-Type'];
      const data = req.body;
      const { data: responseData, status } = await axios({
        url: endpoint,
        method,
        data,
        params: {
          ...req.query,
          userId: dynamicConactId,
        },
        headers: {
          'Content-Type': contentType || 'application/json',
        },
      });
      log.info(
        `Dynamic | API | URL: ${endpoint} | Method: ${method}| Success: ${status}`
      );
      return resp.status(status || HttpStatus.OK).json(responseData || {});
    } catch (err) {
      log.error(`dynamic-middleware | path: ${path} | Error: ${err}`);
      if (err.response) {
        return resp.status(err.response.status).json({
          dynamicResponse: JSON.stringify(err.response.data || {}),
        });
      } else {
        resp
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(`Unable to preocess dynamic request with err: ${err}`);
      }
    }
  };

const handlePath = (path, isSecure) => {
  let middleware = [proxyMiddleWare(isSecure)];
  if (isSecure) {
    middleware = [
      passport.authenticate('jwt', { session: false }),
      auth.isValidBackendToken(),
      proxyMiddleWare(isSecure),
    ];
  }
  log.info(
    `Dynamic : Managing ${path} with number of middleware: ${middleware.length}`
  );
  router.all(`/${path}/*`, middleware, (req, resp) => {
    log.warn('Dynamic | should be handled by middlewre | path:', req.path);
    return;
  });
  router.all(`/${path}`, middleware, (req, resp) => {
    log.warn('Dynamic | should be handled by middlewre | path:', req.path);
    return;
  });
};

allowedPulicPaths.forEach((path) => handlePath(path, false));
allowedProtectedPaths.forEach((path) => handlePath(path, true));

module.exports = router;
