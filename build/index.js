"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//se importa desde app

_app["default"].listen(10000);
console.log("server listen on port", 10000);