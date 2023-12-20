"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var petSchema = new _mongoose.Schema({
  animalType: String,
  name: String,
  gender: String,
  years: Number,
  birthDate: String,
  dx: String,
  photo: String
}, {
  timestamps: true,
  // cada que se guarde un nuevo dato va con su fecha de creacion o ultima fecha de actualizacion
  versionKey: false //
});
var _default = (0, _mongoose.model)("Pet", petSchema);
exports["default"] = _default;