
var mongoose = require("mongoose");

var ImagesSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    images: {
      type: Array
    },
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Images"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Images = mongoose.model("Images", ImagesSchema);
module.exports = Images;