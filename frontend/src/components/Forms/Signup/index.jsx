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
import Search from "../../inputs/Search"
import {API_BASE_URL} from "../../../config"
import {useAuth} from "../../../contexts/AuthContext"
import handleSignupSubmit from "./submission-logic"

/**
 * Signup form component.
 * Uses labels for accessibility purposes
 * (important for screenreaders) but hides
 * them using CSS for a more clean 
 * look where the input information is 
 * conveyed using the placeholder attribute
 * for sighted users.
 * @returns rendered SignupForm component
 */
function SignupForm() {

  // If the user is logged in, attempt to get their business's ID, 
  // otherwise default to 1
  const authCon = useAuth()
  let BusinessID = authCon.user ? authCon.user.BusinessID : 1;

  // Stateful object to store error messages for each input field
  const [errorObj, setErrorObj] = useState({
    first: '',
    last: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  // State variables
  // Note: Having default state of "Pending..." is
  // necessary for roleNamesList because the search component 
  // relies on having one search result for calculating 
  // animations based on height
  const [submitResult, setSubmitResult] = useState("")
  const [rolesList, setRolesList] = useState([])
  const [roleNamesList, setRoleNamesList] = useState(["Pending..."])
  const [roleTitlesList, setRoleTitlesList] = useState([])

  // Form submission function, functions stored in separate file
  function handleSubmit(e) {
    e.preventDefault();
    const {errorObj, submitResult} = handleSignupSubmit(e, rolesList, BusinessID)
    setErrorObj(errorObj)
    setSubmitResult(submitResult)
  }

  // Fetch list of all role objects from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}roles/`);
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const jsonRes = await response.json();
        const roles = jsonRes.data;
        setRolesList(roles);
        setRoleNamesList(roles.map(role => role.RoleName))
        setRoleTitlesList(roles.map(role => role.Description))
      } catch (error) {
        console.error('Error fetching roles:', error.message);
        setSubmitResult("Cannot connect to server. Please contact support.")
      }
    };
    fetchRoles();
  }, []);
  
  // Metadata used to tell form which inputs to render in the form.
  // Name must match keys as they appear in errorObj and in any
  // references used in the submission logic
  const formFields = [
    { name: 'first', type: 'text', placeholder: 'First name' },
    { name: 'last', type: 'text', placeholder: 'Last name' },
    { name: 'username', type: 'text', placeholder: 'Username' },
    { name: 'role', type: 'search', placeholder: 'Role', data: roleNamesList, titles: roleTitlesList },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm password' },
  ];


  return (
    <form className="signup-form" onSubmit={handleSubmit}>

      {formFields.map(fieldObj => 
        (<fieldset className={fieldObj.name} key={fieldObj.name}>

          <label htmlFor={fieldObj.name} className="visually-hidden">
              {fieldObj.placeholder}
          </label>

          { fieldObj.type === "search" ? 
            <Search 
              name={fieldObj.name} 
              placeholder={fieldObj.placeholder} 
              data={fieldObj.data}
              titles={fieldObj.titles}
            /> : 
            <input
              id={fieldObj.name}
              name={fieldObj.name}
              placeholder={fieldObj.placeholder}
              type={fieldObj.type}
            />
          }

          <div className="form-error">
              {errorObj[fieldObj.name]}
          </div>

          </fieldset>
        )
      )}

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

// TODO: debuggin