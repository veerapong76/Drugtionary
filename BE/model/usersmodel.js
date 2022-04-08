var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา

    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    birthday: {
      type: String,
    },
    medicalStaft: {
      type: Boolean,
    },
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "User",
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var User = mongoose.model("User", userSchema);
module.exports = User;
