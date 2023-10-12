'use strict';
const { getSessionUser, getDataWithParams } = require('./utils');
const config = require('../config');
const { ServiceError } = require('./error');
const HttpStatus = require('http-status-codes');
const log = require('./logger');
// const lodash = require('lodash');
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

/**
 * @description Split display names into firstName and lastName
 * @param {string} name
 * @returns {object}
 */
const userName = (name = '') => {
  const separators = [',', ' ', ';'];
  let separator = ' ';
  for (const sep of separators) {
    if (name.toString().includes(sep)) {
      separator = sep;
      break;
    }
  }
  const [firstName, ...lastNames] = name.split(separator);
  return {
    firstName,
    lastName: lastNames.join(' '),
  };
};

/**
 * @description Return information received from Keycloak to expected format
 * @param {object} userInfo
 * @returns {object}
 */
function getUserKeyCloakDetails(userInfo) {
  const displayName = userInfo.display_name ?? 'Unknown';
  const userGuid = userInfo.user_guid ?? null;
  const names = userName(displayName);
  return {
    displayName: displayName,
    firstName: names.firstName,
    lastName: names.lastName,
    userId: userGuid
      ? `${userGuid.toLowerCase()}@bceidbasic`
      : userInfo.preferred_username,
  };
}

async function getUserInfo(req, res) {
  const userInfo = getSessionUser(req);
  const passportUser = {
    ...(userInfo || {}),
  };
  delete passportUser.jwt;
  delete passportUser.jwtFrontend;
  delete passportUser.refreshToken;
  delete passportUser._json;
  log.info('getUserInfo | info | ', {
    user: req.user || {},
    passportUser,
  });
  const correlationID = req.session?.correlationID;
  if (!userInfo || !userInfo.jwt) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'No session data',
    });
  }
  const userDetails = getUserKeyCloakDetails(userInfo._json);
  let resData = {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userInfo._json.email,
    userId: userDetails.userId,
    displayName: userDetails.displayName,
    accountType: userInfo._json.azp,
    telephone1: userInfo._json.phone,
  };
  return res.status(HttpStatus.OK).json(resData);
}

module.exports = {
  getUserInfo,
  getEdxUserByDigitalId,
  getUserKeyCloakDetails,
};
