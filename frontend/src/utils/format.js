import {
  DateTimeFormatterBuilder,
  LocalDate,
  LocalDateTime,
  ResolverStyle,
} from '@js-joda/core';
import { NULL_STRING } from './constants';

export function getDateFormatter(pattern) {
  return new DateTimeFormatterBuilder()
    .appendPattern(pattern)
    .toFormatter(ResolverStyle.STRICT);
}

export function formatDateTime(
  datetime,
  from = 'uuuuMMdd',
  to = 'uuuu/MM/dd',
  hasTimePart = false
) {
  const fromFormatter = getDateFormatter(from);
  const toFormatter = getDateFormatter(to);
  let result = datetime;
  const localDateTime = hasTimePart ? LocalDateTime : LocalDate;
  if (datetime && datetime.length > 0) {
    try {
      const date = localDateTime.parse(datetime, fromFormatter);
      result = date.format(toFormatter);
    } catch (err) {
      console.info(
        `could not parse date ${datetime}: ${from} to ${to} as date provided is invalid`
      );
    }
  }
  return result;
}

export function formatPhoneNumber(phoneNumberString) {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return null;
}

export function formatMincode(mincode) {
  return mincode;
}

export function formatDob(dob, from = 'uuuuMMdd', to = 'uuuu/MM/dd') {
  return formatDateTime(dob, from, to);
}

//used in institution schools/districts/authorities date formatting
export function formatDate(
  rawDate,
  from = "uuuu-MM-dd'T'HH:mm:ss",
  to = 'uuuu/MM/dd'
) {
  return formatDateTime(rawDate, from, to);
}

export function formatContactName(contact) {
  return contact.firstName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.lastName;
}

// Used in the DataTable.vue to format the tableHeaders
export function formatSnakeCaseToString(key) {
  return key
    .split('_')
    .map((word) => {
      const isNumber = word === 'number';
      const formatTitle = isNumber
        ? '#'
        : word.charAt(0).toUpperCase() + word.slice(1);
      return formatTitle;
    })
    .join(' ');
}

export function formatBooleanToYesNoString(bool) {
  return bool ? 'Yes' : 'No';
}

// Used to display data or default where 0 is an acceptable value.
export function displayDefaultNumberValue(data) {
  return data || data === 0 ? data : NULL_STRING;
}

export const formatStringToNumericArray = (string) =>
  string ? string.split(',').map((value) => Number(value)) : [];
