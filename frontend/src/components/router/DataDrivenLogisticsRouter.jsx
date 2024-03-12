import { BrowserRouter, Route, Routes } from "react-router-dom";

import DataDrivenLogistics from "../navigation/DataDrivenLogistics";
import Dashboard from "../../pages/Dashboard";
import LoginPage from "../../pages/LoginPage";
import ShipmentTracking from "../../pages/ShipmentTracking";
import Signup from "../../pages/Signup"

export default function DataDrivenLogisticsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<DataDrivenLogistics />}>
                <Route path="/" element={<LoginPage />} />  
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/shipment-tracking" element={<ShipmentTracking />} />
                <Route path="/signup" element={<Signup />} /> 
                {/* Add future routes here! */}
            </Route>
        </Routes>
    </BrowserRouter>
}