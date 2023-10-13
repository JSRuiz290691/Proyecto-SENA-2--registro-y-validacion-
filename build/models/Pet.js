"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var petSchema = new _mongoose.Schema({
  tipoAnimal: String,
  name: String,
  sexo: String,
  años: Number,
  fechaNacimiento: String,
  DX: String,
  imgULR: String
}, {
  timestamps: true,
  // cada que se guarde un nuevo dato va con su fecha de creacion o ultima fecha de actualizacion
  versionKey: false //
});
var _default = (0, _mongoose.model)("Pet", petSchema);
exports["default"] = _default;