import React, { useState, useEffect } from "react";
import "./SignupForm.css";
import Search from "../../inputs/Search";
import { useAuth } from "../../../contexts/AuthContext";
import handleSignupSubmit from "./submission-logic";
import { getAllRolesWithCaching } from "../../../services/roleService";
import BaseBtn from "../../BaseComponents/BaseBtn";

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
  const authCon = useAuth();
  const BusinessID = authCon && authCon.user ? authCon.user.BusinessID : 1;

  // Stateful object to store error messages for each input field
  const [errorObj, setErrorObj] = useState({
    first: "",
    last: "",
    role: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // State variables
  // Note: Having default state of "Pending..." is
  // necessary for roleNamesList because the search component
  // relies on having one search result for calculating
  // animations based on results height
  const [submitResult, setSubmitResult] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [roleNamesList, setRoleNamesList] = useState(["Pending..."]);
  const [roleTitlesList, setRoleTitlesList] = useState([]);

  // Form submission function, functions stored in separate file for brevity
  async function handleSubmit(e) {
    e.preventDefault();
    const { errorObj, submitResult } = await handleSignupSubmit(
      e,
      rolesList,
      BusinessID
    );
    setErrorObj(errorObj);
    setSubmitResult(submitResult);
  }

  // When component mounts, fetch roles from localStorage
  // or from backend using functionality from roleService
  useEffect(() => {
    const fetchRoles = async () => {
      const { success, data } = await getAllRolesWithCaching();
      if (success) {
        setRolesList(data);
        setRoleNamesList(data.map((role) => role.RoleName));
        setRoleTitlesList(data.map((role) => role.Description));
      } else {
        setSubmitResult("Failed to connect to server. Please contact support.");
      }
    };

    fetchRoles();
  }, []);

  // Metadata used to tell form which inputs to render in the form.
  // Name must match keys as they appear in errorObj and in any
  // references used in the submission logic
  const formFields = [
    { name: "first", type: "text", placeholder: "First name" },
    { name: "last", type: "text", placeholder: "Last name" },
    { name: "username", type: "text", placeholder: "Username" },
    {
      name: "role",
      type: "search",
      placeholder: "Role",
      data: roleNamesList,
      titles: roleTitlesList,
    },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
    },
  ];

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {formFields.map((fieldObj) => (
        <fieldset className={fieldObj.name} key={fieldObj.name}>
          <label htmlFor={fieldObj.name} className="visually-hidden">
            {fieldObj.placeholder}
          </label>

          {fieldObj.type === "search" ? (
            <Search
              name={fieldObj.name}
              placeholder={fieldObj.placeholder}
              data={fieldObj.data}
              titles={fieldObj.titles}
            />
          ) : (
            <input
              id={fieldObj.name}
              name={fieldObj.name}
              placeholder={fieldObj.placeholder}
              type={fieldObj.type}
            />
          )}

          <div className="form-error">{errorObj[fieldObj.name]}</div>
        </fieldset>
      ))}

      <div className="submit-container">
        <div className="submit-result-text">{submitResult}</div>

        <BaseBtn theme="primary">SUBMIT</BaseBtn>
      </div>
    </form>
  );
}

export default SignupForm;
