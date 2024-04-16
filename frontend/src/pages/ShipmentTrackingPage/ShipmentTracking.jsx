import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as shipmentService from '../../services/shipmentService';
import styles from '../../styles/Table.module.css';  // Using Table.module.css for table styles

const ShipmentTracking = () => {
    const { user } = useAuth();
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState('');

    const loadShipments = async () => {
        if (!user || !user.BusinessID) {
            return;
        }
        try {
            const businessId = user.BusinessID;
            const shipmentsData = await shipmentService.fetchShipmentsByCompany(businessId);
            setShipments(shipmentsData.data);  // Assuming shipmentsData comes already structured for rendering
        } catch (error) {
            setError('Failed to fetch shipments');
            console.error(error);
        }
    };


    useEffect(() => {
        loadShipments();
    }, [user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className={styles.headerContainer}>
                <h1>Shipment Tracking</h1>
            </div>
            <div className={styles.tableContainer}>
                {shipments.length !== 0 ?
                    <table className={styles.tableFullWidth}>
                        <thead>
                            <tr className={styles.strongRowLine}>
                                <th className={styles.tableHeader}>Shipment ID</th>
                                <th className={styles.tableHeader}>Source</th>
                                <th className={styles.tableHeader}>Destination</th>
                                <th className={styles.tableHeader}>Departure Date</th>
                                <th className={styles.tableHeader}>Arrival Date</th>
                                <th className={styles.tableHeader}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment) => (
                                <tr key={shipment.ShipmentID} className={styles.strongRowLine}>
                                    <td className={styles.tableCell}>{shipment.ShipmentID}</td>
                                    <td className={styles.tableCell}>{shipment.SourceID}</td> 
                                    <td className={styles.tableCell}>{shipment.DestinationID}</td>
                                    <td className={styles.tableCell}>{shipment.DepartureDate}</td>
                                    <td className={styles.tableCell}>{shipment.ArrivalDate}</td>
                                    <td className={styles.tableCell}>{shipment.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <h2>No shipments found.</h2>
                }
            </div>
        </div>
    );
};

export default ShipmentTracking;
