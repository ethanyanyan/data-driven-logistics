// src/services/authService.js

import {API_BASE_URL} from "../config"
const USERS_BASE_URL = `${API_BASE_URL}users`;
const SHIPMENTS_BASE_URL = `${API_BASE_URL}shipments`;

// Function to login
export const loginAPI = async (username, password) => {
  try {
    const response = await fetch(`${USERS_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  } catch (error) {
    console.log("Login response error");
    return { success: false, error };
  }
};

export const fetchUsersByCompany = async (companyId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${USERS_BASE_URL}/${companyId}`, {
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

export const fetchShipmentsByCompany = async (companyId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${SHIPMENTS_BASE_URL}/${companyId}`, {
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
