const axios = require('axios');
const config = require('../config/index');
const logger = require('./logger');

const dynamicIntegrationService = {
  host() {
    return `http://${config.get('d365').host}:5091/api`
  },
  async health() {
    const endPoint = this.host() + '/Health';
    return (await axios.get(endPoint)).data;
  }
};

/**
 * Export
 */
module.exports = dynamicIntegrationService