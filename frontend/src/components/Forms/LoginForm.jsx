// src/components/LoginForm.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from '../../assets/images/logo.png';
import BaseBtn from "./../BaseComponents/BaseBtn";

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
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <BaseBtn htmlType="submit" btnType="primary">
          Login
        </BaseBtn>
      </form>
    </div>
  );
}

export default LoginForm;
