import React, { useState, useEffect } from "react";
import "./SignupForm.css";
import Search from "../../inputs/Search";
import { useAuth } from "../../../contexts/AuthContext";
import handleSignupSubmit from "./submission-logic";
import { getAllRolesWithCaching } from "../../../services/roleService";
import BaseBtn from "../../BaseComponents/BaseBtn";
import BaseInput from "../../BaseComponents/BaseInput";

const initialFormData = {
  first: "",
  last: "",
  username: "",
  role: "",
  password: "",
  confirmPassword: "",
};

function SignupForm() {
  const authCon = useAuth();
  const BusinessID = authCon?.user?.BusinessID || 1;

  const [formData, setFormData] = useState(initialFormData);
  const [errorObj, setErrorObj] = useState(initialFormData);
  const [submitResult, setSubmitResult] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [roleNamesList, setRoleNamesList] = useState([]);
  const [roleTitlesList, setRoleTitlesList] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      const { success, data } = await getAllRolesWithCaching();
      if (success) {
        setRolesList(data);
        setRoleNamesList(data.map(role => role.RoleName));
        setRoleTitlesList(data.map(role => role.Description));
      } else {
        setSubmitResult("Failed to connect to server. Please contact support.");
      }
    }
    fetchRoles();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorObj(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errorObj: newErrorObj, submitResult: newSubmitResult } = await handleSignupSubmit(
      formData, rolesList, BusinessID
    );
    setErrorObj(newErrorObj);
    setSubmitResult(newSubmitResult);

    if (newSubmitResult === "Successfully added new user") {
      setFormData(initialFormData);
    }
  };

  const formFields = [
    { name: "first", type: "text", placeholder: "First name" },
    { name: "last", type: "text", placeholder: "Last name" },
    { name: "username", type: "text", placeholder: "Username" },
    { name: "role", type: "search", placeholder: "Role", data: roleNamesList, titles: roleTitlesList },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "confirmPassword", type: "password", placeholder: "Confirm password" },
  ];

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {formFields.map(fieldObj => (
        <fieldset className={fieldObj.name} key={fieldObj.name}>
          <label htmlFor={fieldObj.name} className="visually-hidden">{fieldObj.placeholder}</label>
          {fieldObj.type === "search" ? (
            <Search
              name={fieldObj.name}
              placeholder={fieldObj.placeholder}
              data={fieldObj.data}
              titles={fieldObj.titles}
              value={formData[fieldObj.name]}
              onChange={(value) => handleInputChange(fieldObj.name, value)}
            />
          ) : (
            <BaseInput
              id={fieldObj.name}
              modelValue={formData[fieldObj.name]}
              onChange={(value) => handleInputChange(fieldObj.name, value)}
              placeholder={fieldObj.placeholder}
              type={fieldObj.type}
            />
          )}
          <div className="form-error">{errorObj[fieldObj.name]}</div>
        </fieldset>
      ))}
      <div className="submit-container">
        <div className="submit-result-text">{submitResult}</div>
        <BaseBtn theme="primary" htmlType="submit">SUBMIT</BaseBtn>
      </div>
    </form>
  );
}

export default SignupForm;
