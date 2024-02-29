import { BrowserRouter, Route, Routes } from "react-router-dom";

import DataDrivenLogistics from "../DataDrivenLogistics";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

export default function DataDrivenLogisticsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<DataDrivenLogistics />}>
                <Route path="/" element={<LoginPage />} />  
                <Route path="/dashboard" element={<Dashboard />} /> 
                {/* Add future routes here! */}
            </Route>
        </Routes>
    </BrowserRouter>
}