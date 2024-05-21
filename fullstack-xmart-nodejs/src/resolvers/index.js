const Transaksi = require("../models/TransaksiMongo");

const postgreDB = require("../config/database");
const redisClient = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

const root = {
  getTransaksi: async () => {
    try {
      const transactions = await Transaksi.find().limit(100);

      if (!transactions || transactions.length === 0) {
        console.log("No transactions found in the database.");
        return [];
      }

      return transactions;
    } catch (error) {
      console.error("Failed to retrieve transactions:", error);
      throw new Error("Unable to fetch transactions");
    }
  },

  addBarang: async ({ rfid }) => {
    try {
      const cacheData = await redisClient.get(rfid);

      if (cacheData) {
        return JSON.parse(cacheData);
      } else {
        const barang = await postgreDB.oneOrNone(
          "SELECT * FROM barang WHERE rfid = $1",
          [rfid]
        );

        if (barang) {
          await redisClient.setEx(rfid, 120, JSON.stringify(barang));

          return barang;
        } else {
          await redisClient.setEx(rfid, 120, "Try again later");
          throw new Error("Item not found");
        }
      }
    } catch (error) {
      throw new Error(`Error occurred: ${error.message}`);
    }
  },

  simpanTransaksi: async ({ data: { qrcode, rfid, harga_satuan, jumlah } }) => {
    try {
      const currentTime = new Date();

      const transactionData = {
        _id: uuidv4(),
        qrcode,
        rfid,
        harga_satuan,
        jumlah,
        date: currentTime.toISOString(),
      };

      const transaction = new Transaksi(transactionData);
      await transaction.save();
      console.log(
        "Transaction data has been saved to MongoDB:",
        transactionData
      );
      return transactionData;
    } catch (error) {
      console.error("Failed to save transaction data to MongoDB:", error);
      throw new Error("Failed to save transaction data to MongoDB");
    }
  },
};

module.exports = root;
