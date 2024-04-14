import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from '../../assets/images/logo.png';
import BaseBtn from "./../BaseComponents/BaseBtn";
import BaseInput from "./../BaseComponents/BaseInput";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error !== "") {
      setError("");
    }
    const isLoggedIn = await login(username, password);

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-field">
          <label htmlFor="username">Username:</label>
          <BaseInput
            id="username"
            modelValue={username}
            onChange={setUsername}
            placeholder="Enter your username"
            type="text"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <BaseInput
            id="password"
            modelValue={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <BaseBtn htmlType="submit" btnType="primary" label="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
