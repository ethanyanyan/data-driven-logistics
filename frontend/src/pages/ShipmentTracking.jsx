import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as shipmentService from '../services/shipmentService';
import './ShipmentTracking.css';

const ShipmentTracking = () => {
    const { user } = useAuth();
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || !user.BusinessID) {
            return;
        }
        
        const loadShipments = async () => {
            try {
                const businessId = user.BusinessID;
                const shipmentsData = await shipmentService.fetchShipmentsByCompany(businessId);
                setShipments(shipmentsData.data); 
            } catch (error) {
                setError('Failed to fetch shipments');
                console.error(error);
            }
        };

       loadShipments();
    }, [user]);

    if (error) {
        return <div className="pageContainer">Error: {error}</div>;
    }

    return (
        <div className="pageContainer">
            <div className="headerContainer">
                <h1>Shipment Tracking</h1>
            </div>
            { shipments.length != 0 ?
            <table className="tableFullWidth">
                <thead>
                    <tr className="strongRowLine">
                        <th>Shipment ID</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((shipment) => (
                        <tr key={shipment.ShipmentID} className="strongRowLine">
                            <td>{shipment.ShipmentID}</td>
                            <td>{shipment.SourceID}</td> 
                            <td>{shipment.DestinationID}</td>
                            <td>{shipment.DepartureDate}</td>
                            <td>{shipment.ArrivalDate}</td>
                            <td>{shipment.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            : <h2>No shipments found.</h2>}
        </div>
    );
};

export default ShipmentTracking;
