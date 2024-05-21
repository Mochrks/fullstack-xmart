const mongoose = require("mongoose");

const { Schema } = mongoose;

const transaksiSchema = new Schema({
  _id: { type: String },
  qrcode: { type: String, required: true },
  rfid: { type: String, required: true },
  harga_satuan: { type: Number, required: true },
  jumlah: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaksi = mongoose.model("Transaksi", transaksiSchema);
module.exports = Transaksi;
