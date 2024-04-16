import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as shipmentService from '../../services/shipmentService';
import * as locationService from '../../services/locationService';
import styles from '../../styles/Table.module.css';  

const ShipmentTracking = () => {
    const { user } = useAuth();
    const [shipments, setShipments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');

    const loadShipmentsAndLocations = async () => {
        if (!user || !user.BusinessID) {
            return;
        }
        try {
            const businessId = user.BusinessID;
            const shipmentsData = await shipmentService.fetchShipmentsByCompany(businessId);
            const locationsData = await locationService.getAllLocations();

            if (locationsData.success) {
                setLocations(locationsData.data);
            } else {
                throw new Error(locationsData.error);
            }

            setShipments(shipmentsData.data); 
        } catch (error) {
            setError('Failed to fetch data');
            console.error(error);
        }
    };

    useEffect(() => {
        loadShipmentsAndLocations();
    }, [user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getLocationNameById = (id) => {
        const location = locations.find(loc => loc.LocationID === id);
        return location ? location.LocationName : 'Unknown Location';
    };

    return (
        <div>
            <div className={styles.headerContainer}>
                <h1>Shipment Tracking</h1>
            </div>
            <div className={styles.tableContainer}>
            {shipments.length > 0 ?
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
                                <td className={styles.tableCell}>{getLocationNameById(shipment.SourceID)}</td> 
                                <td className={styles.tableCell}>{getLocationNameById(shipment.DestinationID)}</td>
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
