import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as userService from '../services/userService';

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
            }
        };

        loadUsers();
    }, [user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.UserID}>{user.FirstName + " " + user.LastName}</li> 
                ))}
            </ul>
        </div>
    );
};

export default UsersListPage;
