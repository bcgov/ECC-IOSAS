const axios = require('axios');
const config = require('../config/index');
const logger = require('./logger');

let d365 = null;
const dynamicIntegrationService = {
  config() {
    return d365 || (() => {
      d365 = config.get('d365') || { host: 'NA' };
      logger.info(`D365 | Config | ${JSON.stringify(d365, null, 2)}`, d365)
      return d365;
    })()
  },
  host() {
    return `http://${this.config().host}:5091/api`
  },
  async health() {
    const endPoint = this.host() + '/Health';
    logger.info(`D365 | Health | URL: ${endPoint}`);
    return (await axios.get(endPoint)).data;
  }
};

/**
 * Export
 */
module.exports = dynamicIntegrationService