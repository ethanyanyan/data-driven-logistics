import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import DataDrivenLogistics from "../layouts/DataDrivenLogistics";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import UsersListPage from "../pages/UsersListPage/UsersListPage";
import ShipmentTracking from "../pages/ShipmentTrackingPage/ShipmentTracking";
import Signup from "../pages/SignupPage";
import PageNoMatch from "../pages/NoMatchPage/PageNoMatch";

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
