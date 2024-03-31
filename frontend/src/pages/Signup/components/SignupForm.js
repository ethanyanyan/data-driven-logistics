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
import {useAuth} from "../../../contexts/AuthContext"
import "./SignupForm.css"
import FormField from './FormField';
import * as v from "../validation";
import {API_BASE_URL} from "../../../config"


function SignupForm() {

  const {user} = useAuth();

  const [errorObj, setErrorObj] = useState({
    first: '',
    last: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [submitResult, setSubmitResult] = useState("")
  const [rolesList, setRolesList] = useState(["Pending..."])
  const [roleTitlesList, setRoleTitlesList] = useState([])
  const [roleNameIdMap, setRoleNameIdMap] = useState({})

  const validationObj = {
    first: [
      v.notEmpty, 
      v.startsCapital, 
      v.alphaOnly
    ],
    last: [
      v.notEmpty, 
      v.startsCapital, 
      v.alphaOnly
    ],
    role: [
      v.notEmpty,
      v.matchesOneInList
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

  async function createNewUser(formData) {

    let BusinessID = 1;
    if (user) {
      BusinessID = user.BusinessID
    }

    const newUser = {
      businessId: BusinessID,
      roleId: roleNameIdMap[formData.get("role")],
      username: formData.get("username"),
      password: formData.get("password"),
      firstName: formData.get("first"),
      lastName: formData.get("last"),
    };
    console.log("New user")
    console.log(newUser)
    
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
    if (response.ok) {
      console.log("New user added")
    }
    else {
      console.error("Failed to add new user to DB")
    }

  }

  function handleSubmit2(e) {
    e.preventDefault();
    let success = true;
    const formData = new FormData(e.target);
    console.log(formData)
    for (const [field, val] of formData.entries()) {
      let outputMsg = "";
      for (let i=0; i<validationObj[field].length; i++) {
        const func = validationObj[field][i];
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
            // const roleNames = rolesList.map(role => role.RoleName)
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
      createNewUser(formData)
    }
    else {
      setSubmitResult("")
    }
  }






  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}roles/`);
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const jsonRes = await response.json();
        const roles = jsonRes.data;
        // setRolesList(roles)
        setRolesList(roles.map(role => role.RoleName))
        setRoleTitlesList(roles.map(role => role.Description))
        let mapping = {}
        for (const role of roles) {
          mapping[role.RoleName] = role.RoleID
        }
        setRoleNameIdMap(mapping)
      } catch (error) {
        console.error('Error fetching roles:', error.message);
        setSubmitResult("Cannot connect to server. Please contact support.")
      }
    };
  
    fetchRoles();
  }, []);
  

  const formFields = [
    { name: 'first', type: 'text', placeholder: 'First name' },
    { name: 'last', type: 'text', placeholder: 'Last name' },
    { name: 'username', type: 'text', placeholder: 'Username' },
    { name: 'role', type: 'search', placeholder: 'Role', data: rolesList, titles: roleTitlesList },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm password' },
  ];


  return (
    <form className="signup-form" onSubmit={handleSubmit2}>

        {formFields.map(fieldObj => (
            <FormField 
                key={fieldObj.name} 
                {...fieldObj}
                error={errorObj[fieldObj.name]}
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