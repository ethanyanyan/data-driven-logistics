// src/services/inventoryService.js

import { API_BASE_URL } from '../config';
const INVENTORY_BASE_URL = `${API_BASE_URL}inventory`;

export const createItem = async (itemData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(INVENTORY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error('Failed to create new inventory item');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getItemById = async (itemId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${INVENTORY_BASE_URL}/${itemId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch inventory item');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllItems = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(INVENTORY_BASE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch inventory items');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateItemQuantity = async (itemId, quantity) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${INVENTORY_BASE_URL}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory item quantity');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateInventoryItem = async (itemId, itemUpdates) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${INVENTORY_BASE_URL}/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemUpdates),
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteInventoryItem = async (itemId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${INVENTORY_BASE_URL}/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete inventory item');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
