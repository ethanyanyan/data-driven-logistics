// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { loginAPI } from "./../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    // Placeholder function to change login state
    const login = async (username, password) => {
        const response = await loginAPI(username, password);
        if (response.success) {
            setLoggedIn(true);
            return true
        } else {
            // Handle login failure (e.g., set an error state, log to console)
            console.error('Login failed');
            return false
        }
    };
    const logout = () => setLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
