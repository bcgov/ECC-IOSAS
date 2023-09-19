import { NULL_STRING } from './constants';

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
  if (bool === null) {
    return NULL_STRING;
  } else {
    return bool ? 'Yes' : 'No';
  }
}

// Used to display data or default where 0 is an acceptable value.
export function displayDefaultNumberValue(data) {
  return data || data === 0 ? data : NULL_STRING;
}

export const formatStringToNumericArray = (string) =>
  string ? string.split(',').map((value) => Number(value)) : [];

export const formatStringToArray = (string) =>
  string ? string.split(',').map((value) => value) : [];

export const formatArrayToString = (array) =>
  array.length > 0 ? array.toString() : null;
