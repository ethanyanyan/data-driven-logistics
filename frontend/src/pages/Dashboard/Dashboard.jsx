import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import InventoryManagerDashboard from "./InventoryManagerDashboard";
import CorporateManagerDashboard from "./CorporateManagerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  const rolesForCorporateManager = [1, 2, 4];

  const showCorporateManagerDashboard =
    user && rolesForCorporateManager.includes(user.RoleID);

  return (
    <div>
      {showCorporateManagerDashboard ? (
        <CorporateManagerDashboard user={user} />
      ) : (
        <InventoryManagerDashboard user={user} />
      )}
    </div>
  );
};

export default Dashboard;
