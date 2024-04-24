/**
 * Defines the validation functions
 * to be used when the new shipment modal form
 * is submitted to check that the
 * input values are valid.
 */

import * as v from ".";

export const shipmentValidationObj = {
  first: [v.notEmpty, v.matchesOneInList],
  first: [v.notEmpty, v.matchesOneInList],

};
