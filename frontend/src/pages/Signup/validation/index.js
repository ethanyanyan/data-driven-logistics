/**
 * Functions used to validate input 
 * text given to a form
 */

export function notEmpty(txt) {
  if (txt === "") {
    return { isValid: false, errorMsg: "Cannot be empty" };
  }
  return { isValid: true, errorMsg: null };
}

export function minLength(txt, len) {
  if (txt.length < len) {
    return {
      isValid: false,
      errorMsg: `Must be longer than ${len} characters`,
    };
  }
  return { isValid: true, errorMsg: null };
}

export function maxLength(txt, len) {
  if (txt.length > len) {
    return {
      isValid: false,
      errorMsg: `Must be shorter than ${len} characters`,
    };
  }
  return { isValid: true, errorMsg: null };
}

export function startsCapital(txt) {
  if (! /^[A-Z]/.test(txt[0])) {
    return { isValid: false, errorMsg: "Must start with capital letter" };
  }
  return { isValid: true, errorMsg: null };
}

export function alphaOnly(txt) {
    if (/^[a-zA-Z]+$/.test(txt)) {
      return { isValid: true, errorMsg: null };
    }
      return { isValid: false, errorMsg: "Letters only" };
  }

export function alphaNumericOnly(txt) {
  if (/^[a-zA-Z0-9]+$/.test(txt)) {
    return { isValid: true, errorMsg: null };
  }
    return { isValid: false, errorMsg: "Alphanumeric characters only" };
}

export function matchesTarget(txt, target) {
  if (txt !== target) {
    return { isValid: false, errorMsg: "Does not match" };
  }
  return { isValid: true, errorMsg: null };
}

export function matchesOneInList(txt, list) {
    if (! list.includes(txt)) {
        return { isValid: false, errorMsg: "Must match value in list" };
    }
    return { isValid: true, errorMsg: null };
}
