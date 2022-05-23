
var mongoose = require("mongoose");

var drugsSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    geneticName: {
      type: String
    },
    brandName: {
      type: String
    },
    uses: {
      type: Object
    },
    warnings: {
      type: Object
    },
    dosage: {
      type: Number
    },
    detail: {
      type: String
    },
    images: {
      type: Array
    },
    serialNumber: {
      type: String
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Drugs"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Drugs = mongoose.model("Drugs", drugsSchema);
module.exports = Drugs;