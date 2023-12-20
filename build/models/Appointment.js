"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var appointmentSchema = new _mongoose.Schema({
  date: {
    type: String
  },
  time: {
    type: String
  },
  pet: {
    ref: "Pet",
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("Appointment", appointmentSchema);
exports["default"] = _default;