// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { loginAPI } from "./../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Placeholder function to change login state
    const login = async (username, password) => {
        const response = await loginAPI(username, password);
        if (response.success) {
            setLoggedIn(true);
            setUser(response.user); // Store the user data in state
            localStorage.setItem('token', response.token); // Store the token in local storage
            return true
        } else {
            // Handle login failure (e.g., set an error state, log to console)
            console.error('Login failed');
            return false
        }
    };
    const logout = () => {
        setLoggedIn(false);
        setUser(null); // Clear the user data
        localStorage.removeItem('token'); // Clear the token from local storage
      };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
