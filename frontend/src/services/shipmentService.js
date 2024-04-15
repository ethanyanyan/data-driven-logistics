// src/services/authService.js

import {API_BASE_URL} from "../config"
const SHIPMENTS_BASE_URL = `${API_BASE_URL}shipments`;

export const fetchShipmentsByCompany = async (businessId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${SHIPMENTS_BASE_URL}/business/${businessId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  //implement new shipment logging here.
  