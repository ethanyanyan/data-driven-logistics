import React from "react";
import LoginForm from "../../components/Forms/LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Login</h1> 
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
