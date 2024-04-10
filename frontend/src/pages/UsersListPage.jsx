import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as userService from '../services/userService';
import { ROLES } from '../constants/constants';
import './UsersListPage.css';
import BaseBtn from "./../components/BaseComponents/BaseBtn";

const UsersListPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || !user.BusinessID) {
            return;
        }
        
        const loadUsers = async () => {
            try {
                const companyId = user.BusinessID; 
                const usersData = await userService.fetchUsersByCompany(companyId);
                setUsers(usersData);
            } catch (error) {
                setError('Failed to fetch users');
                console.error(error);
            }
        };

        loadUsers();
    }, [user]);

    if (error) {
        return <div className="pageContainer">Error: {error}</div>;
    }

    return (
        <div className="pageContainer">
            <div className="headerContainer">
                <h1>List of Users</h1>
                <BaseBtn type="primary" to="/signup">
                    Add User +
                </BaseBtn>
            </div>
            <table className="tableFullWidth">
                <thead>
                    <tr className="strongRowLine">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.UserID} className="strongRowLine">
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{ROLES[user.RoleID]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersListPage;
