import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import DataDrivenLogistics from "../components/navigation/DataDrivenLogistics";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import UsersListPage from "../pages/UsersListPage";
import ShipmentTracking from "../pages/ShipmentTracking";
import Signup from "../pages/Signup";
import PageNoMatch from "../pages/PageNoMatch";

export default function DataDrivenLogisticsRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataDrivenLogistics />}>
            <Route index element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipment-tracking"
              element={
                <ProtectedRoute>
                  <ShipmentTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersListPage />
                </ProtectedRoute>
              }
            />
            {/* Add future routes here! */}
            <Route path="/*" element={<PageNoMatch></PageNoMatch>} />
            {/* Add future routes here! */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
