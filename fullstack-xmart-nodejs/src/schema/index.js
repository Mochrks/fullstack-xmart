const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Barang {
    rfid: String!
    nama_barang: String!
    harga_satuan: Int!
  }

  type Transaksi {
    _id: String!
    qrcode: String!
    rfid: String!
    harga_satuan: Int!
    jumlah: Int!
    date: String!
  }

  input TransaksiQuery {
    qrcode: String!
    rfid: String!
    harga_satuan: Int!
    jumlah: Int!
  }

  type Query {
    addBarang(rfid: String!): Barang
    getTransaksi: [Transaksi]!
  }

  type Mutation {
    simpanTransaksi(data: TransaksiQuery!): Transaksi
  }
`);

module.exports = { schema };
