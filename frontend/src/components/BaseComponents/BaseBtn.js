import React from "react";
import { useNavigate } from "react-router-dom";
import "./BaseBtn.css"; // Make sure the path to your CSS file is correct

const BaseBtn = ({ to, onClick, children, type = "primary" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      onClick();
    }
  };

  const buttonType = type === "primary" ? "primary-btn" : "secondary-btn";
  return (
    <button className={`button ${buttonType}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default BaseBtn;
