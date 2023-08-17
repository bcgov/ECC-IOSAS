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
    phone: null, // replace with phone key from userInfo
    //edx user name may not exist yet in case of relink or activation. If so, fallback to BCeid displayName
    displayName: userInfo.displayName ?? 'Unknown',
    accountType: userInfo._json.azp,
    userId: userInfo.upn,
  };
  return res.status(HttpStatus.OK).json(resData);
}

module.exports = {
  getUserInfo,
  getEdxUserByDigitalId,
};
