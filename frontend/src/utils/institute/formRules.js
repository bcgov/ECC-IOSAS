// contains helper functions for form validation in vue.
//
// Ex. use case to create an email input that is required
//  <v-text-field
//     v-model="contactEdit.alternatePhoneExtension"
//     :rules="[rules.email(), rules.required('custom message here')]"
//  </v-text-field>
//
// Example SchoolContact.vue
//
// REMEMBER to do the following in your .vue file
//  import * as Rule from @/utils/institute/form
//  under data do rules: Rules <- allows you to use in <template>.

import { LocalDate } from '@js-joda/core';
import { isNil } from 'lodash';

/**
 * Rule for emails
 * @param {String} message
 * @returns Function
 */
const email = (message = 'E-mail must be valid') => {
  return (v) =>
    !v ||
    /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,63}$/.test(
      v
    ) ||
    message;
};

/**
 * Rule to check input is a number
 * @param {String} message
 * @returns Function
 */
const number = (message = 'Must be a positive number') => {
  return (v) => !v || /^\d+$/.test(v) || message;
};

/**
 * Rule for phone numbers also works for fax numbers too
 * @param {String} message
 * @returns Function
 */
const phoneNumber = (message = 'Phone Number must be valid') => {
  return (v) =>
    !v ||
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) ||
    message;
};

/**
 * Rule for postalCodes
 * @param {String} message
 * @returns Function
 */
const postalCode = (message = 'Postal code must be valid') => {
  return (v) =>
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
      v
    ) || message;
};

/**
 * Rule required v.trim prevents ' ' from being valid
 * @param {String} message
 * @returns Function
 */
const required = (message = 'Required') => {
  return (v) => !!(v && v.trim()) || message;
};

/**
 * Rule required number allows 0 to be valid
 * @param {String} message
 * @returns Function
 */
const requiredNumber = (message = 'Required') => {
  return (v) => {
    if (v || v === 0) {
      return false;
    } else {
      return message;
    }
  };
};

/**
 * Custom endDate Rule! Checks that we have start date and that end date
 * happens after start date. Date format should be 2022-12-10 YYYY-MM-DD.
 * @param {String} effectiveDate
 * @param {String} expiryDate
 * @returns {String|Boolean}
 */
const endDateRule = (
  effectiveDate,
  expiryDate,
  message = 'End date cannot be before start date'
) => {
  if (effectiveDate && expiryDate) {
    const effDate = LocalDate.parse(effectiveDate.substring(0, 10));
    const expDate = LocalDate.parse(expiryDate.substring(0, 10));

    return expDate.isAfter(effDate) || expDate.isEqual(effDate) || message;
  }

  return true;
};

/**
 * Custom gradeRange Rule! Checks that the end grade
 * happens after start grade.
 * @param {String} startGrade
 * @param {String} endGrade
 * @returns {String|Boolean}
 */
const gradeRangeRule = (
  startGrade,
  endGrade,
  message = 'End grade cannot be before start grade'
) => {
  if (startGrade && endGrade) {
    return startGrade <= endGrade || message;
  }

  return true;
};

/**
 * Rule for website url
 * @param {String} message
 * @returns Function
 */
const website = (message = 'Website must be valid') => {
  return (v) =>
    !v ||
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-zA-Z0-9\-]+(\.[a-z\-]{2,}){1,3}(#?\/?[a-zA-Z0-9\-#]+)*\/?(\?[a-zA-Z0-9-_\-]+=[a-zA-Z0-9-%\-]+&?)?$/.test(
      v
    ) ||
    message;
};

/**
 * Rule for Select - also works for radioGroups without Boolean values
 * @param {String} message
 * @returns Function
 */
const requiredSelect = (message = 'Required') => {
  return (v) => {
    return !!v || message;
  };
};

/**
 * Rule for RadioGroups with Boolean values
 * @param {String} message
 * @returns Function
 */
const requiredRadio = (message = 'Required') => {
  return (v) => !isNil(v) || message;
};

/**
 * Rule for for requiring a field if previous fields have been set to false
 * @param {String} message
 * @param {Object} data
 * @param {Array} fields
 * @returns Function
 */
const requiredIfNo = (data, fields, message = 'Required') => {
  return (v) => {
    let response = true;
    fields.forEach((fieldName) => {
      if (data[fieldName] === false || data[fieldName] === 2) {
        response = message;
      }
    });

    return response;
  };
};

/**
 * Custom confirmation email Rule! Forces user to confirm the email address being saved with the record
 * @param {String} contactEmail
 * @param {String} confirmationEmail
 * @returns {String|Boolean}
 */
const emailConfirmation = (
  contactEmail,
  confirmationEmail,
  message = 'The email must match the designated contacts email'
) => {
  if (contactEmail && confirmationEmail) {
    return contactEmail === confirmationEmail || message;
  }
  return true;
};

/**
 * Custom validation to ensure student enrolment is > 10
 * @returns {String|Boolean}
 */
const enrolmentTotalGreaterThanTen = (
  message = 'A new school must have 10 or more students enrolled'
) => {
  return (v) => v >= 10 || message;
};

export {
  email,
  endDateRule,
  number,
  phoneNumber,
  postalCode,
  required,
  website,
  requiredSelect,
  requiredRadio,
  requiredNumber,
  emailConfirmation,
  gradeRangeRule,
  enrolmentTotalGreaterThanTen,
  requiredIfNo,
};
