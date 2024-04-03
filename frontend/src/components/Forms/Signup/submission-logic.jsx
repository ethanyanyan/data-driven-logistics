import {signupValidationObj} from "../validation/signup-val"
import {API_BASE_URL} from "../../../config"

/**
 * Handles submission logic for SignupForm component.
 * Loops through form data and applies validation functions
 * to each field's value.
 * 
 * Returned errorObj has keys of field
 * names and values of error messages or empty strings.
 * 
 * @param {Event} e - form element's onSubmit event
 * @param {List<string>} rolesList - List of role objects from backend
 *  to run matchesOneInList validation function
 * 
 * @returns {
 *  errorObj: Object,
 *  submitResult: string
 * } 
 */
async function handleSignupSubmit(e, rolesList, businessId) {
  
  let success = true;
  let errorObj = {}
  let submitResult = ""
  const formData = new FormData(e.target);

  // Apply validation functions to each field and 
  // update errorObj based on result
  for (const [field, val] of formData.entries()) {
    let outputMsg = "";
    for (let i=0; i<signupValidationObj[field].length; i++) {
      const func = signupValidationObj[field][i];
      let args = null

      switch (func.name) {
        case "minLength":
          const MINCHARS = 5
          args = [val, MINCHARS]
          break;
        case "maxLength":
          const MAXCHARS = 20
          args = [val, MAXCHARS]
          break;
        case "matchesTarget":
          const passwordVal = formData.password
          const confirmVal = formData.confirmPassword
          args = [passwordVal, confirmVal]
          break;
        case "matchesOneInList":
          const acceptedListVals = rolesList.map(role => role.RoleName)
          args = [val, acceptedListVals];
          break;
        default:
          args = [val]
      }
      
      const {isValid, errorMsg} = func(...args);
      if (isValid === false) {
        outputMsg = errorMsg;
        success = false;
        break
      }
    }
    errorObj[field] = outputMsg;
  }

  // If the form passes all validation functions, attempt
  // to create a new user on backend
  if (success) {
    const {resultBool, resultTxt} = await createNewUser(formData, rolesList, businessId)
    if (resultBool) {
      e.target.reset()
    }
    submitResult = resultTxt
  }

  // If one or more validation functions fail, there is no
  // need to show a submission result because error messages
  // will be shown in the SignupForm component
  else {
    submitResult = ""
  }

  return {errorObj: errorObj, submitResult: submitResult}

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
  const chosenRole = rolesList.filter(role => role.RoleName === formData.get("role"))[0]
  const chosenRoleId = chosenRole.RoleID
  const newUser = {
    businessId: businessId,
    roleId: chosenRoleId,
    username: formData.get("username"),
    password: formData.get("password"),
    firstName: formData.get("first"),
    lastName: formData.get("last"),
  };
  
  // Make POST request
  const url = `${API_BASE_URL}users/register`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    mode: "cors",
    body: JSON.stringify(newUser),
  })

  // return value based on the server's response
  if (response.ok) {
    return {resultBool: true, resultTxt: "Successfully added new user"}
  }
  else {
    return {resultBool: false, resultTxt: "Cannot connect to server and create new user. Please contact support."}
  }

}

export default handleSignupSubmit