import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as userService from '../services/userService';
import { ROLES } from '../constants/constants';
import './UsersListPage.css';
import BaseBtn from "../components/BaseComponents/BaseBtn";

const UsersListPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const intervalId = useRef(null);

    useEffect(() => {
        intervalId.current = setInterval(() => {
            if (user && user.BusinessID) {
                loadUsers();
            }
        }, 1000);

        return () => {
            clearInterval(intervalId.current);
        };  
    }, [user]);  

    const loadUsers = async () => {
        clearInterval(intervalId.current); 
        if (!user || !user.BusinessID) return;
        try {
            const usersData = await userService.fetchUsersByCompany(user.BusinessID);
            setUsers(usersData);
        } catch (error) {
            setError('Failed to fetch users');
            console.error(error);
        }
    };

    const deleteUser = async (userID) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const result = await userService.deleteUser(userID);
            if (result.success) {
                setUsers(users.filter(u => u.UserID !== userID));
                alert("User deleted successfully.");
            } else {
                alert(result.message);
            }
        } catch (error) {
            setError("Failed to delete user");
            console.error(error);
        }
    };

    if (error) return <div className="pageContainer">Error: {error}</div>;

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.UserID} className="strongRowLine">
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{ROLES[user.RoleID]}</td>
                            <td>
                                <BaseBtn onClick={() => deleteUser(user.UserID)} btnType="secondary" label="Delete" size="sm" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersListPage;
