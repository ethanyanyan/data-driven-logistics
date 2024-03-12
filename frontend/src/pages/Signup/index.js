import React, {useState} from "react"
import "./Signup.css"
import Logo from "../../assets/images/logo.png"
import SignupForm from "./components/SignupForm"

function Signup() {
    return (
        <div className="signup-page">

            <img src={Logo} className="logo-img" alt="DDL Logo" />
            
            <div className="header-section">
                <div className="h-line"/>
                <h1 className="header-text">Create New Account</h1>
                <div className="h-line"/>
            </div>

            <SignupForm />

        </div>
    )
}

export default Signup