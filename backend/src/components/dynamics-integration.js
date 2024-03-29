const assert = require('assert');
const axios = require('axios');
const config = require('../config/index');
const logger = require('./logger');
const { getUserKeyCloakDetails } = require('./user');
let d365 = null;
const dynamicIntegrationService = {
  config() {
    return (
      d365 ||
      (() => {
        d365 = config.get('d365') || { host: 'NA' };
        logger.info(`D365 | Config | ${JSON.stringify(d365, null, 2)}`, d365);
        return d365;
      })()
    );
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
    const { firstName, lastName, userId } = getUserKeyCloakDetails(info);
    const { email } = info;
    const body = {
      iosas_externaluserid: userId,
      lastname: lastName,
      firstname: firstName,
      emailaddress1: email,
      telephone1: '',
    };
    try {
      const { data } = await axios.post(endPoint, body);
      logger.info('Register | Dynamic | Resp | Success | request:', body);
      logger.info('Register | Dynamic | Resp | Success | resp:', data);
      const { value = [], contactid: contactId } = data;
      if (contactId) {
        logger.info(`Register | Dynamic | ID:`, contactId);
        return {
          dynamicContactId: contactId,
        };
      }
      assert(value.length > 0, 'Empty/No value received from service');
      const [item] = value;
      assert(item.contactid, 'No contact id recived in the resp');
      logger.info(`Register | Dynamic | ID:`, item.contactid);
      return {
        dynamicContactId: item.contactid,
      };
    } catch (err) {
      logger.error(`Register | Fail to register/login | ${err}`);
      throw err;
    }
  },
  async swagger() {
    const endPoint = this.host() + '/swagger/index.html';
    const { data } = await axios.get(endPoint);
    return data;
  },
};

/**
 * Export
 */
module.exports = dynamicIntegrationService;
