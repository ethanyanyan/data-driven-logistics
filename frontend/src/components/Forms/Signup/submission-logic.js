import { signupValidationObj } from "../validation/signup-val";
import { API_BASE_URL } from "../../../config";

/**
 * Handles submission logic for SignupForm component.
 * Loops through form data and applies validation functions
 * to each field's value.
 *
 * Returned errorObj has keys of field
 * names and values of error messages or empty strings.
 *
 * @param {Event} formData - form element's onSubmit event
 * @param {List<string>} rolesList - List of role objects from backend
 *  to run matchesOneInList validation function
 *
 * @returns {
 *  errorObj: Object,
 *  submitResult: string
 * }
 */
async function handleSignupSubmit(formData, rolesList, businessId) {
  let success = true;
  let errorObj = {};
  let submitResult = "";

  for (const [field, val] of Object.entries(formData)) {
    let outputMsg = "";
    if (signupValidationObj[field]) {
      for (let i = 0; i < signupValidationObj[field].length; i++) {
        const func = signupValidationObj[field][i];
        let args = [val];

        switch (func.name) {
          case "minLength":
            const MINCHARS = 5;
            args.push(MINCHARS);
            break;
          case "maxLength":
            const MAXCHARS = 20;
            args.push(MAXCHARS);
            break;
          case "matchesTarget":
            args = [formData.password, formData.confirmPassword];
            break;
          case "matchesOneInList":
            const acceptedListVals = rolesList.map((role) => role.RoleName);
            args = [val, acceptedListVals];
            break;
          default:
            break; // No additional args needed
        }

        const { isValid, errorMsg } = func(...args);
        if (!isValid) {
          outputMsg = errorMsg;
          success = false;
          break;
        }
      }
    }
    errorObj[field] = outputMsg;
  }

  // Proceed if no validation errors
  if (success) {
    const { resultBool, resultTxt } = await createNewUser(
      formData,
      rolesList,
      businessId,
    );
    submitResult = resultTxt;
    if (resultBool) {
      // Reset form state here if needed
    }
  } else {
    submitResult = "Validation failed. Please check the fields.";
  }

  return { errorObj, submitResult };
}

/**
 * Helper function for handleSignupSubmit.
 * Given the validated formData, attempts
 * to create a new user on the backend.
 *
 * @param {FormData} formData - Object containing field names and values
 * @returns {
 *  resultBool: bool,
 *  resultTxt: string
 * }
 */
async function createNewUser(formData, rolesList, businessId) {
  // Object for new user according to expected DB schema
  // for Users table. Expect roles from backend to have unique IDs.
  const chosenRole = rolesList.filter(
    (role) => role.RoleName === formData.role,
  )[0];
  const chosenRoleId = chosenRole.RoleID;
  const newUser = {
    businessId: businessId,
    roleId: chosenRoleId,
    username: formData.username,
    password: formData.password,
    firstName: formData.first,
    lastName: formData.last,
  };

  // Make POST request
  const url = `${API_BASE_URL}users/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
    body: JSON.stringify(newUser),
  });

  // return value based on the server's response
  if (response.ok) {
    return { resultBool: true, resultTxt: "Successfully added new user" };
  } else {
    return {
      resultBool: false,
      resultTxt:
        "Cannot connect to server and create new user. Please contact support.",
    };
  }
}

export default handleSignupSubmit;
