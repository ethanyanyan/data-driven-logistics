import {signupValidationObj} from "../validation/signup-val"

export function handleSubmit(e) {
    e.preventDefault();
    let success = true;
    const formData = new FormData(e.target);
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
            args = [val, rolesList];
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
      setErrorObj((prevData) => ({
        ...prevData,
        [field]: outputMsg,
      }))
    }
    if (success) {
      setSubmitResult("Adding new user to your organization...")
      if (createNewUser(formData)) {
        e.target.reset()
      }
    }
    else {
      setSubmitResult("")
    }
  }