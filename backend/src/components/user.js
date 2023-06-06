'use strict';
const { getData, getSessionUser, getDataWithParams } = require('./utils');
const config = require('../config');
const { ServiceError } = require('./error');
const HttpStatus = require('http-status-codes');
const lodash = require('lodash');
const log = require('./logger');
const cacheService = require('./cache-service');
let codes = null;

async function getEdxUserByDigitalId(accessToken, digitalID, correlationID) {
  try {
    const params = {
      params: {
        digitalId: digitalID,
      }
    };
    return await getDataWithParams(accessToken, config.get('edx:edxUsersURL'), params, correlationID);
  } catch (e) {
    throw new ServiceError('getEdxUserByDigitalId error', e);
  }
}

function isDistrictOrSchoolAlreadyInUserSession(req) {
  return (req.session.userSchoolIDs && req.session.userSchoolIDs.length > 0) || (req.session.userDistrictIDs && req.session.userDistrictIDs.length > 0);
}

async function getUserInfo(req, res) {
  const userInfo = getSessionUser(req);
  const correlationID = req.session?.correlationID;
  console.dir({
    userInfo,
    correlationID,
    session: req.session
  });
  if (!userInfo || !userInfo.jwt) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'No session data'
    });
  }


  let resData = {
    //edx user name may not exist yet in case of relink or activation. If so, fallback to BCeid displayName
    displayName: userInfo.displayName ?? "Unknown",
    accountType: userInfo._json.azp,
  };

  return res.status(HttpStatus.OK).json(resData);
}

async function getDigitalIdData(token, digitalID, correlationID) {
  try {
    return await getData(token, config.get('digitalID:apiEndpoint') + `/${digitalID}`, correlationID);
  } catch (e) {
    throw new ServiceError('getDigitalIdData error', e);
  }
}


async function getServerSideCodes(accessToken, correlationID) {
  if (!codes) {
    try {
      const codeUrls = [
        `${config.get('digitalID:apiEndpoint')}/identityTypeCodes`
      ];

      const [identityTypes] = await Promise.all(codeUrls.map(url => getData(accessToken, url), correlationID));
      codes = { identityTypes };
    } catch (e) {
      throw new ServiceError('getServerSideCodes error', e);
    }
  }
  return codes;
}

module.exports = {
  getUserInfo,
  getEdxUserByDigitalId
};
