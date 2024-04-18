import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import InventoryManagerDashboard from './InventoryManagerDashboard';
import CorporateManagerDashboard from './CorporateManagerDashboard'; 

const Dashboard = () => {
  const { user } = useAuth(); // Use the useAuth hook to access the current user's info

  // Define the roles that should see the Corporate Manager Dashboard
  const rolesForCorporateManager = [1, 2, 4];
  
  // Check if the user's role is among those defined for Corporate Manager
  const showCorporateManagerDashboard = user && rolesForCorporateManager.includes(user.RoleID);

  return (
    <div>
      {showCorporateManagerDashboard ? (
        <CorporateManagerDashboard user={user} /> // Render the Corporate Manager Dashboard for roles 1, 2, 4
      ) : (
        <InventoryManagerDashboard user={user} /> // Render the Inventory Manager Dashboard for other roles
      )}
    </div>
  );
};

export default Dashboard;
