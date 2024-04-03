/**
 * Case insensitive search to find items
 * in arr that contain the target string.
 * @param {string} target string to find in list of strings arr
 * @param {Array<string>} arr list of strings to search through
 * @returns {Array<string>} list of strings that contain target
 */
export function caseInsensitive(target, arr) {
  const newArr = arr.filter((item) => {
    if (typeof item === "string") {
      return item.toLowerCase().includes(target.toLowerCase());
    }
    return false;
  });
  return newArr;
}

/**
 * Case insensitive search to find items
 * in arr that contain the target string.
 * Returns results in alphabetical order.
 * @param {string} target string to find in list of strings arr
 * @param {Array<string>} arr list of strings to search through
 * @returns {Array<string>} sorted list of strings that contain target
 */
export function caseInsensitiveAlphabetical(target, arr) {
  const newArr = arr.filter((item) => {
    if (typeof item === "string") {
      return item.toLowerCase().includes(target.toLowerCase());
    }
    return false;
  });
  newArr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  return newArr;
}
