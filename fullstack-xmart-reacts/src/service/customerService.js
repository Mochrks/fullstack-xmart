import { axiosInstance } from "../utils/config";

// Get all customers
export const getCustomers = async () => {
  try {
    const response = await axiosInstance.get("customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

// Get customer by ID (with QRCode)
export const getCustomerById = async (customerId) => {
  try {
    const response = await axiosInstance.get(`customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with ID: ${customerId}`, error);
    throw error;
  }
};
