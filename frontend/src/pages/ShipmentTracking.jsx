import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
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
                setShipments(shipmentsData.data); // is there a reason I have to do it this way?
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
                {/* TODO: implement new button fields here like this: <button className="addButton">Add User +</button> */}
            </div>
            <table className="tableFullWidth">
                <thead>
                    <tr className="strongRowLine">
                        <th>Shipment ID</th>
                        <th>Source</th>
                        <th>Destination</th>
                        {/* TODO: add more fields here */}
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((shipment) => (
                        <tr key={shipment.ShipmentID} className="strongRowLine">
                            <td>{shipment.SourceID}</td>
                            <td>{shipment.DestinationID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShipmentTracking;
