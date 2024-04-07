import { Outlet } from "react-router-dom";
import DataDrivenLogisticsNavbar from './DataDrivenLogisticsNavbar';

export default function DataDrivenLogistics() {
    return <div>
        <DataDrivenLogisticsNavbar />
        <div style={{ margin: "1rem" }}>
            <Outlet />
        </div>
    </div>
}