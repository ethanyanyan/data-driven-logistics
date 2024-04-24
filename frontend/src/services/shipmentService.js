// src/services/shipmentService.js

import { API_BASE_URL } from "../config";
const SHIPMENTS_BASE_URL = `${API_BASE_URL}shipments`;

export const fetchShipmentsByCompany = async (businessId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${SHIPMENTS_BASE_URL}/business/${businessId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `API Error: ${data.message || "Network response was not ok"}`,
      );
    }
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addShipment = async (businessId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${SHIPMENTS_BASE_URL}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
//implement new shipment logging here.
