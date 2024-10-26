import { axiosInstance } from "../utils/config";

// Get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

// Get product by ID (with RFID)
export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID: ${productId}`, error);
    throw error;
  }
};
