"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var petSchema = new _mongoose.Schema({
  name: String,
  años: Number,
  parentesco: String,
  fechaNacimiento: Date,
  imgULR: String
}, {
  timestamps: true,
  // cada que se guarde un nuevo dato va con su fecha de creacion o ultima fecha de actualizacion
  versionKey: false //
});
var _default = (0, _mongoose.model)("Pet", petSchema);
exports["default"] = _default;