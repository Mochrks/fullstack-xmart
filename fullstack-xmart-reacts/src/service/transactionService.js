import { axiosInstance } from "../utils/config";

// Get all transactions
export const getTransactions = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:8080/api/transactions"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw error;
  }
};

// Get transaction by ID
export const getTransactionById = async (transactionId) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:8080/api/transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching transaction with ID: ${transactionId}`,
      error
    );
    throw error;
  }
};
