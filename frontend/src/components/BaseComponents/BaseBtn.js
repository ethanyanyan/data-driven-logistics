import React from "react";
import { useNavigate } from "react-router-dom";
import "./BaseBtn.css";

const BaseBtn = ({
  to,
  onClick,
  children,
  btnType = "primary",
  htmlType = "button",
}) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Prevent default only if it's not meant to submit a form
    if (htmlType === "button") {
      event.preventDefault();
      if (to) {
        navigate(to);
      } else if (onClick) {
        onClick();
      }
    } else {
      // If it's a submit button, the form's onSubmit handler will take care of it
      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <button
      type={htmlType}
      className={`button ${btnType === "primary" ? "primary-btn" : "secondary-btn"}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default BaseBtn;
