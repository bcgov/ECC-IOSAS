const assert = require('assert');
const axios = require('axios');
const config = require('../config/index');
const logger = require('./logger');

let d365 = null;
const dynamicIntegrationService = {
  config() {
    return d365 || (() => {
      d365 = config.get('d365') || { host: 'NA' };
      logger.info(`D365 | Config | ${JSON.stringify(d365, null, 2)}`, d365);
      return d365;
    })();
  },
  host() {
    return `http://${this.config().host}:5091`;
  },
  async health() {
    const endPoint = this.host() + '/api/Health';
    logger.info(`D365 | Health | URL: ${endPoint}`);
    return (await axios.get(endPoint)).data;
  },
  async register(info) {
    const endPoint = this.host() + '/api/Contact/Login';
    const { given_name, family_name, email, preferred_username } = info;
    const body = {
      iosas_externaluserid: preferred_username,
      lastname: family_name,
      firstname: given_name,
      emailaddress1: email,
      telephone1: ''
    }
    try {
      const { data } = await axios.post(endPoint, body);
      logger.info('Register | Dynamic | Resp | ', data);
      const { value } = data;
      assert(value.length > 0, 'Empty/No value received from service');
      const [ item ] = value
      assert(item.contactid, 'No contact id recived in the resp');
      return {
        dynamicContactId: item.contactid,
      }
    } catch (err) {
      logger.error(`Register | Fail to register/login | ${err}`);
      return {
        dynamicContactId: null
      }
    }
  }
};

/**
 * Export
 */
module.exports = dynamicIntegrationService;
