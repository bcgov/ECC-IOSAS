'use strict';
const express = require('express');
const log = require('../components/logger');
const config = require('../config/index');

// Express router
const router = express.Router();

// Environment endpoint
router.get('/', (req, res) => {
  const buildInfo = config.get('buildInfo') || { envPrefix: 'na' };
  log.info('Environment: Route | Env Prefix: ', buildInfo.envPrefix);
  let envDetails = {};
  switch (buildInfo.envPrefix) {
    case 'test':
      envDetails = {
        bannerColor: '#b200ff',
        beceidRegURL:
          'https://www.test.bceid.ca/register/basic/account_details.aspx?type=regular#action%27',
      };
      break;
    case 'production':
      envDetails = {
        beceidRegURL:
          'https://www.bceid.ca/register/basic/account_details.aspx?type=regular&eServiceType=basic',
      };
      break;
    default:
      envDetails = {
        bannerColor: '#ff0',
        beceidRegURL:
          'https://www.development.bceid.ca/register/basic/account_details.aspx?type=regular&eServiceType=basic',
      };
  }
  return res.status(200).json({
    env: buildInfo.envPrefix,
    ...envDetails,
  });
});

module.exports = router;
