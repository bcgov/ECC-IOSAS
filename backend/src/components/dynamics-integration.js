const axios = require('axios');
const config = require('../config/index');
const logger = require('./logger');

const dynamicIntegrationService = {
  host() {
    const d365 = config.get('d365');
    logger.info(`D365 | Config | ${JSON.stringify(d365, null, 2)}`, d365)
    return `http://${d365.host}:5091/api`
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