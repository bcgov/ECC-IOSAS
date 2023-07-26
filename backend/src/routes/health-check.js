'use strict';
const log = require('../components/logger');
const dynamicIntegrationService = require('../components/dynamics-integration');
class HealthCheckController {
  constructor(express) {
    this._router = express.Router();
  }

  configure() {
    this._router.get('/api/health', (req, res) => this.healthCheck(req, res));
    this._router.get('/api/health-d365', (req, res) => this.dynamicConatinerHealth(res));
    return this;
  }

  get router() {
    return this._router;
  }

  async healthCheck(req, res) {
    res.sendStatus(200);
  }

  async dynamicConatinerHealth(res) {
    try {
      await dynamicIntegrationService.health();
      return res.sendStatus(200);
    } catch (excp) {
      log.error(`Health: Dynamic: Received Error: ${excp}`);
      return res.sendStatus(500);
    }
  }
}
const EXPRESS = require('express');
module.exports = new HealthCheckController(EXPRESS);
