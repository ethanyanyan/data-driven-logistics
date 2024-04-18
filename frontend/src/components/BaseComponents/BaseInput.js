import React, { useState, useRef, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import PropTypes from "prop-types";
import "./BaseInput.css";

const BaseInput = ({
  id,
  modelValue = "",
  placeholder = "",
  disabled = false,
  size = "md",
  searchbar = false,
  type = "text",
  onChange,
  ...props
}) => {
  const inputRef = useRef(null);
  const [inputType, setInputType] = useState("text");

  useEffect(() => {
    if (type === "textarea" || type === "password") {
      setInputType(type);
    } else if (type === "negative" || type === "positive") {
      setInputType("text");
    } else {
      setInputType(searchbar ? "search" : "text");
    }
  }, [type, searchbar]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const inputStyle = `${size}-input ${type}`;

  return (
    <InputGroup className={`${inputStyle}`}>
      <FormControl
        id={id}
        ref={inputRef}
        as={type === "textarea" ? "textarea" : "input"}
        type={inputType}
        value={modelValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={`${disabled ? "disabled" : ""} form-control`}
        {...props}
      />
      {searchbar && (
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
      )}
    </InputGroup>
  );
};

BaseInput.propTypes = {
  modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["md", "sm"]),
  searchbar: PropTypes.bool,
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "search",
    "textarea",
    "negative",
    "positive",
  ]),
  onChange: PropTypes.func,
};

export default BaseInput;
