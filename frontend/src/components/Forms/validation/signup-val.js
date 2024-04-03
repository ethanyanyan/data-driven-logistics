/**
 * Defines the validation functions
 * to be used when the SignUp form
 * is submitted to check that the
 * input values are valid.
 */

import * as v from ".";

export const signupValidationObj = {
  first: [v.notEmpty, v.startsCapital, v.alphaOnly],
  last: [v.notEmpty, v.startsCapital, v.alphaOnly],
  role: [v.notEmpty, v.matchesOneInList],
  username: [v.notEmpty, v.alphaNumericOnly, v.minLength, v.maxLength],
  password: [v.notEmpty, v.alphaNumericOnly, v.minLength, v.maxLength],
  confirmPassword: [
    v.notEmpty,
    v.alphaNumericOnly,
    v.minLength,
    v.maxLength,
    v.matchesTarget,
  ],
};
