// In ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from './../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // User not logged in, redirect to login page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;