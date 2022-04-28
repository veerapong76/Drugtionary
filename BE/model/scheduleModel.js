var mongoose = require("mongoose");

var scheduleSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา

    enable: {
      type: Boolean,
    },
    user: {
      type: String,
    },
    drug: {
      type: String
    },
    time: {
      type: Date
    },
    detail: {
      type: Object
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    drugs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drugs"
    }
  },
  {
    collection: "Schedule",
  }
);

var Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
