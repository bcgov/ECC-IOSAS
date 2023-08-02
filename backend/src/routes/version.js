'use strict';
const HttpStatus = require('http-status-codes');
const config = require('../config/index');
class VersionController {
  constructor(express) {
    this._router = express.Router();
    this._router.get('/api/version', (req, res) => this.version(req, res));
  }

  get router() {
    return this._router;
  }

  async version(_, res) {
    res.status(HttpStatus.OK).json(config.get('buildInfo') || {});
  }
}
const EXPRESS = require('express');
module.exports = new VersionController(EXPRESS);
