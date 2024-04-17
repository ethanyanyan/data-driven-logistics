import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as userService from '../../services/userService';
import { ROLES } from '../../constants/constants';
import styles from '../../styles/Table.module.css'; 
import BaseBtn from "../../components/BaseComponents/BaseBtn";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const UsersListPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');


    const loadUsers = async () => {
        if (!user || !user.BusinessID) return;
        try {
            const usersData = await userService.fetchUsersByCompany(user.BusinessID);
            setUsers(usersData);
        } catch (error) {
            setError('Failed to fetch users');
            console.error(error);
        }
    };

    useEffect(() => {
        loadUsers(); 
    },[user]);

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

    const sortUsers = (field) => {
        const isAscending = (sortField === field) && (sortDirection === 'ascending');
        setSortDirection(isAscending ? 'descending' : 'ascending');
        setSortField(field);
    
        setUsers(prevUsers => {
            const sortedUsers = [...prevUsers];
            sortedUsers.sort((a, b) => {
                let valA = a[field], valB = b[field];
                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }
                if (valA < valB) return isAscending ? 1 : -1;
                if (valA > valB) return isAscending ? -1 : 1;
                return 0;
            });
            return sortedUsers;
        });
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className={styles.headerContainer}>
                <h1>List of Users</h1>
                <BaseBtn type="primary" to="/signup">
                    Add User +
                </BaseBtn>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.tableFullWidth}>
                    <thead>
                        <tr className={styles.strongRowLine}>
                        <th className={styles.tableHeader} onClick={() => sortUsers('FirstName')}>
                            First Name {sortField === 'FirstName' && (sortDirection === 'ascending' ? <SlArrowUp /> : <SlArrowDown />)}
                        </th>
                        <th className={styles.tableHeader} onClick={() => sortUsers('LastName')}>
                            Last Name {sortField === 'LastName' && (sortDirection === 'ascending' ? <SlArrowUp /> : <SlArrowDown />)}
                        </th>
                            <th className={styles.tableHeader}>Role</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.UserID} className={styles.strongRowLine}>
                                <td className={styles.tableCell}>{user.FirstName}</td>
                                <td className={styles.tableCell}>{user.LastName}</td>
                                <td className={styles.tableCell}>{ROLES[user.RoleID]}</td>
                                <td className={styles.tableCell}>
                                    <BaseBtn onClick={() => deleteUser(user.UserID)} btnType="secondary" label="Delete" size="sm" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersListPage;
