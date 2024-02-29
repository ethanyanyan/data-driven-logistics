import DataDrivenLogisticsNavbar from "./nav/DataDrivenLogisticsNavbar";
import { Outlet } from "react-router-dom";

export default function DataDrivenLogistics() {
    return <div>
        <DataDrivenLogisticsNavbar />
        <div style={{ margin: "1rem" }}>
            <Outlet />
        </div>
    </div>
}