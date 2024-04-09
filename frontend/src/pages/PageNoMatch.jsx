import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import "./PageNoMatch.css";

export default function PageNoMatch(props) {
    const { user } = useAuth();
    const [noMatchRoute, setNoMatchRoute] = useState('');

    useEffect(() => {
        console.log("test");
        if(user) {
            setNoMatchRoute('/dashboard');
        }
    }, [user]);

    return (
        <Container className="no-match-page-container">
            <Image alt="Data Driven Logistics Logo" src={logo} className="no-match-page-ddl-logo" />
            <h2>That's a 404.</h2>
            <p>This page does not exist.</p>
            <p>
                <Link to={noMatchRoute}>Back to safety.</Link>
            </p>
        </Container>
    );
}