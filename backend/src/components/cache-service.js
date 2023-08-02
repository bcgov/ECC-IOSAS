'use strict';
// const retry = require('async-retry');
// const {LocalDate, DateTimeFormatter} = require('@js-joda/core');


const cachedData = {};

// const retries = 0;

const cacheService = {
  getCachedData(){
    return cachedData;
  }
};

module.exports = cacheService;
