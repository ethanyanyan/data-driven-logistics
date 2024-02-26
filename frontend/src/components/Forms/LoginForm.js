// src/components/LoginForm.js
import React, { useState } from "react";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(username, password);

    if (result.success) {
      console.log("Login successful:", result.data);
      setError("");

      navigate("/dashboard");
    } else {
      console.error("Login failed:", result.error);
      setError("Login failed. Please check your credentials."); // Update to display error message
    }
  };

  return (
    <div className="form-container">
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
        <button type="submit" className="form-submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
