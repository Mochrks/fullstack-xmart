import { axiosInstance } from "../utils/config";

// Get all transactions
export const getTransactions = async () => {
  try {
    const response = await axiosInstance.get("transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw error;
  }
};

// Get transaction by ID
export const getTransactionById = async (transactionId) => {
  try {
    const response = await axiosInstance.get(`transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching transaction with ID: ${transactionId}`,
      error
    );
    throw error;
  }
};

// save transaction
export const addTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post("transactions/add", {
      qrcode: transactionData.qrcode,
      rfid: transactionData.rfid,
      hargaSatuan: transactionData.hargaSatuan,
      jumlah: transactionData.jumlah,
      waktu: transactionData.waktu,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding transaction", error);
    throw error;
  }
};
