/*
Signup form component
Uses labels for accessibility purposes
(important for screenreaders) but hides
them using CSS for a more clean 
look where the input information
is conveyed using the placeholder attribute
for sighted users.
*/

import React, { useState } from 'react';
import "./SignupForm.css"
import FormField from './FormField';
import * as validation from "../validation";



function SignupForm() {

  const [formData, setFormData] = useState({
    first: '',
    last: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

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
    { name: 'confirm-password', type: 'password', placeholder: 'Confirm password' },
  ];


  return (
    <form className="signup-form" onSubmit={handleSubmit}>

        {formFields.map(fieldObj => (
            <FormField 
                key={fieldObj.name} 
                {...fieldObj} 
                value={formData[fieldObj.name]} 
                onChange={handleInputChange}
            /> 
        ))}

        <div className="submit">
            <button type="submit" className="submit-btn">
                SUBMIT
            </button>
        </div>
    </form>
  );
}

export default SignupForm;