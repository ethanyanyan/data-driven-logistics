import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as userService from '../services/userService';
import { LOCATIONS } from '../constants/constants';
import './ShipmentTracking.css';

const ShipmentTracking = () => {
    const { user } = useAuth();
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || !user.userID) {
            return;
        }
        
        const loadShipments = async () => {
            try {
                const userID = user.userID; 
                const shipmentsData = await userService.fetchShipmentsByUserID(userID);
                setShipments(shipmentsData);
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
                            <td>{LOCATIONS[shipment.SourceID]}</td>
                            <td>{LOCATIONS[shipment.DestinationID]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShipmentTracking;
