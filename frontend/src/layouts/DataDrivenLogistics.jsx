import React from 'react';
import { Outlet } from "react-router-dom";
import DataDrivenLogisticsNavbar from './../components/navigation/DataDrivenLogisticsNavbar';
import styles from './../styles/DataDrivenLogistics.module.css';

export default function DataDrivenLogistics() {
    return (
        <div className={styles.appContainer}>
            <DataDrivenLogisticsNavbar />
            <div className={styles.mainContent}>
                <div className={styles.pageContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
