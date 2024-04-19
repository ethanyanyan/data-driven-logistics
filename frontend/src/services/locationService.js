// src/services/locationService.js

import { API_BASE_URL } from '../config';
const LOCATIONS_BASE_URL = `${API_BASE_URL}locations`;

const token = localStorage.getItem('token');

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const createLocation = async (businessId, latitude, longitude) => {
  try {
    const response = await fetch(LOCATIONS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ businessId, latitude, longitude }),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getAllLocations = async () => {
  try {
    const response = await fetch(LOCATIONS_BASE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return result; 
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};


export const getLocationById = async (locationId) => {
  try {
    const response = await fetch(`${LOCATIONS_BASE_URL}/${locationId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (locationId, updates) => {
  try {
    const response = await fetch(`${LOCATIONS_BASE_URL}/${locationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await fetch(`${LOCATIONS_BASE_URL}/${locationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
