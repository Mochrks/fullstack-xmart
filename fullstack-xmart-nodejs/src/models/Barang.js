const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Barang = sequelize.define("Barang", {
  rfid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  namaBarang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hargaSatuan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Barang;
