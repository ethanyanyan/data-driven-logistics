import { API_BASE_URL } from "../config";

/**
 * Fetches a list of all locations from the backend.
 * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
 */
export const getAllLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}locations/`);
    const resObj = await response.json();
    const data = resObj.data;
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
    return { success: false, error };
  }
};
