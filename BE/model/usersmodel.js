var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    uid:{
      type: String
    },
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
    bloodType: {
      type: String,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    drugs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drugs"
    }],
    schedule: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule"
    }],role: {
      type: String,
      default: "Viewer",
    }
    
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "User",
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var User = mongoose.model("User", userSchema);
module.exports = User;
