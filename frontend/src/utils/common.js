'use strict';

/**
 * EOI and School applications - users can upload documents, and remove them before saving to the db.
 * generateRandomNumber is used to assign a unique id used to identify which document to remove from state.
 * @export generateRandomNumber
 * @return {Number}
 */
export function generateRandomNumber() {
  return Math.floor(Math.random() * 100000 + 1);
}
