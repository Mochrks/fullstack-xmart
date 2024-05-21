const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const Barang = require("./Barang");

const Transaksi = sequelize.define("Transaksi", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  QRCode: {
    type: DataTypes.UUID,
    references: {
      model: Customer,
      key: "QRCode",
    },
    allowNull: false,
  },
  RFID: {
    type: DataTypes.UUID,
    references: {
      model: Barang,
      key: "RFID",
    },
    allowNull: false,
  },
  Jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Waktu: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  HargaSatuan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Customer.hasMany(Transaksi, { foreignKey: "QRCode" });
Barang.hasMany(Transaksi, { foreignKey: "RFID" });

module.exports = Transaksi;
