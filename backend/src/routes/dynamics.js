'use strict';

const passport = require('passport');
const express = require('express');
const HttpStatus = require('http-status-codes');
const { default: axios } = require('axios');
const dynamicIntegrationService = require('../components/dynamics-integration');
const auth = require('../components/auth');
const log = require('../components/logger');

const router = express.Router();


const allowedPaths = ['Document', 'EOI', 'SchoolAuthority', 'SchoolYear', 'MetaData', 'Health'];

const proxyMiddleWare = async (req, resp, next) => {
  const path = req.path || '';
  const method = req.method;
  const dynamicConactId = req.session.dynamicContactId;
  if (!dynamicConactId) {
    resp.status(HttpStatus.FORBIDDEN).send('Forbiden: No Dynamic ID');
  }
  if (!allowedPaths.some(allowedPath => path.includes(allowedPath))) {
    req.status(HttpStatus.FORBIDDEN).send(`Forbiden: The resource ${path} not accissble`);
  }
  log.info(`dynamic-middleware | Processsing | Req: [path: ${path}]; method: ${method}`);
  try {
    const host = dynamicIntegrationService.host();
    const endpoint = host + '/api' + path;
    const { data, status } = await axios({
      url: endpoint,
      method,
      params: {
        ...req.query,
        userId: dynamicConactId,
      },
    });
    log.info(`Dynamic | API | URL: ${endpoint} | Method: ${method}| Success: ${status}`);
    return resp.status(status || HttpStatus.OK).json(data || {})
  } catch (err) {
    log.error(`dynamic-middleware | path: ${path} | Error: ${err}`);
    if (err.response) {
      return resp.status(err.response.status).json({
        dynamicResponse: JSON.stringify(err.response.data || {}) 
      });
    } else {
      resp.status(HttpStatus.INTERNAL_SERVER_ERROR).send(`Unable to preocess dynamic request with err: ${err}`);
    }
  }
};

router.use(passport.authenticate('jwt', {session: false}));
router.use(auth.isValidBackendToken());
router.use(proxyMiddleWare);
allowedPaths.forEach(path => router.all(`/${path}`), () => log.info(`Dynamic | Sholud be handled by middlewre`));
router.all('/', (_, resp) => resp.send(HttpStatus.NOT_FOUND).send(''));
module.exports = router;