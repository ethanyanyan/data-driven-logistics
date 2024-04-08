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
          <Route path="/" element={<LoginPage />} />

          <Route element={<DataDrivenLogistics />}>
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
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersListPage />
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
            {/* Additional protected routes go here */}
          </Route>

          {/* Catch-all for unmatched routes */}
          <Route path="*" element={<PageNoMatch />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
