/*
Signup form component
Uses labels for accessibility purposes
(important for screenreaders) but hides
them using CSS for a more clean 
look where the input information
is conveyed using the placeholder attribute
for sighted users.
*/

import React, { useState, useEffect } from 'react';
import "./SignupForm.css"
import FormField from './FormField';
import * as v from "../validation";



function SignupForm() {

  const [formData, setFormData] = useState({
    first: '',
    last: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errorObj, setErrorObj] = useState({
    first: '',
    last: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [submitResult, setSubmitResult] = useState("")

  const validationObj = {
    first: [
      v.notEmpty, 
      v.startsCapital, 
      v.alphaOnly, 
      v.minLength,
      v.maxLength
    ],
    last: [
      v.notEmpty, 
      v.startsCapital, 
      v.alphaOnly, 
      v.minLength,
      v.maxLength
    ],
    role: [
      v.notEmpty
    ],
    username: [
      v.notEmpty, 
      v.alphaNumericOnly, 
      v.minLength,
      v.maxLength
    ],
    password: [
      v.notEmpty, 
      v.alphaNumericOnly, 
      v.minLength,
      v.maxLength
    ],
    confirmPassword: [
      v.notEmpty, 
      v.alphaNumericOnly, 
      v.minLength,
      v.maxLength,
      v.matchesTarget
    ],
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
    // For each of the form fields, 
    // run each of the accompanying functions
    // Each function should return true
    // or false if the test succeeded/failed
    // and null/an error message
    // For a given field, the first 
    // error message obtained should 
    // be used
    let success = true;
    for (const field in validationObj) {
      let val = formData[field]
      let outputMsg = ""
      console.log(`got val: ${val} for field: ${field}`)
      for (let i=0; i<validationObj[field].length; i++) {
        const func = validationObj[field][i];
        if (func.length === 1) {
          const {isValid, errorMsg} = func(val);
          console.log(`got ${isValid} for ${func.name}`)
          console.log(`got ${errorMsg} for ${func.name}`)
          if (isValid === false) {
            outputMsg = errorMsg;
            success = false;
            setSubmitResult("")
            break
          }
        }
        else {
          switch (func.name) {
            case "minLength":
              console.log("Checking minLength")
              break;
            case "maxLength":
              console.log("Checking maxLength")
              break;
            case "matchesTarget":
              console.log("matchesTarget")
              break;
            default:
              console.error(`Unkown validation function ${func.name} for ${field}`)
          }
        }
      }
      setErrorObj((prevData) => ({
        ...prevData,
        [field]: outputMsg,
      }))
    }
    if (success) {
      setSubmitResult(`Added user ${formData.username} to your organization`)
    }
  };

  const rolesList = [ // TODO: fetch from backend
    "Admin",
    "Contractor",
    "HR",
    "Employee",
    "Manager"
  ]

  const formFields = [
    { name: 'first', type: 'text', placeholder: 'First name' },
    { name: 'last', type: 'text', placeholder: 'Last name' },
    { name: 'username', type: 'text', placeholder: 'Username' },
    { name: 'role', type: 'search', placeholder: 'Role', data: rolesList },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm password' },
  ];


  return (
    <form className="signup-form" onSubmit={handleSubmit}>

        {formFields.map(fieldObj => (
            <FormField 
                key={fieldObj.name} 
                {...fieldObj}
                error={errorObj[fieldObj.name]}
                value={formData[fieldObj.name]} 
                onChange={handleInputChange}
            /> 
        ))}

        <div className="submit-container">

            <div className="submit-result-text">
              {submitResult}
            </div>

            <button type="submit" className="submit-btn">
                SUBMIT
            </button>

        </div>
    </form>
  );
}

export default SignupForm;