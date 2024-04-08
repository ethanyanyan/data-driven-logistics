import { API_BASE_URL } from "../config";

/**
 * Fetches a list of all roles from the backend.
 * success: @returns {
 *  success: bool,
 *  data: List
 * }
 * failure: @returns {
 *  success: bool,
 *  error: string
 * }
 */
export const getAllRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}roles/`);
    const resObj = await response.json();
    const data = resObj.data;
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return { success: false, error };
  }
};

/**
 * Fetches a list of all roles from the backend.
 * Similar to getAllRoles except attempts to
 * retrieve list of roles from localStorage first
 * and also stores roles list in localStorage.
 * success: @returns {
 *  success: bool,
 *  data: List
 * }
 * failure: @returns {
 *  success: bool,
 *  error: string
 * }
 */
export const getAllRolesWithCaching = async () => {
  try {
    const cachedRoles = localStorage.getItem("roles");
    if (cachedRoles) {
      const roles = JSON.parse(cachedRoles);
      return { success: true, data: roles };
    } else {
      const { success, data } = await getAllRoles();
      if (success) {
        localStorage.setItem("roles", JSON.stringify(data));
      }
      return { success, data };
    }
  } catch (error) {
    console.error("Error fetching roles with caching:", error);
    return { success: false, error };
  }
};
