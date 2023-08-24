'use strict';
const { getSessionUser, getDataWithParams } = require('./utils');
const config = require('../config');
const { ServiceError } = require('./error');
const HttpStatus = require('http-status-codes');
// const lodash = require('lodash');
// const log = require('./logger');
// const cacheService = require('./cache-service');
// let codes = null;

async function getEdxUserByDigitalId(accessToken, digitalID, correlationID) {
  try {
    const params = {
      params: {
        digitalId: digitalID,
      },
    };
    return await getDataWithParams(
      accessToken,
      config.get('edx:edxUsersURL'),
      params,
      correlationID
    );
  } catch (e) {
    throw new ServiceError('getEdxUserByDigitalId error', e);
  }
}

async function getUserInfo(req, res) {
  const userInfo = getSessionUser(req);
  const correlationID = req.session?.correlationID;
  if (!userInfo || !userInfo.jwt) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'No session data',
    });
  }

  let resData = {
    firstName: userInfo.name.givenName,
    lastName: userInfo.name.familyName,
    email: userInfo._json.email,
    // userId: userInfo._json.preferred_username,
    displayName: userInfo.displayName ?? 'Unknown',
    accountType: userInfo._json.azp,
    telephone1: userInfo._json.phone,
  };
  return res.status(HttpStatus.OK).json(resData);
}

module.exports = {
  getUserInfo,
  getEdxUserByDigitalId,
};
