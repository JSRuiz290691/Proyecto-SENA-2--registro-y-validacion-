"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _initialSetup = require("./libs/initialSetup");
var _pets = _interopRequireDefault(require("./routers/pets.routes"));
var _auth = _interopRequireDefault(require("./routers/auth.routes"));
var _user = _interopRequireDefault(require("./routers/user.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// es un middleware de express, permitre hacer lo de la linea 7
//subimos un nivel e importamos el package.json

// se importa el createRoles

var cors = require('cors');
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)(); // crea los roles al iniciar la aplicacion

app.use((0, _morgan["default"])("dev")); //para uasar las rutas
app.use(_express["default"].json()); // para que entiendas los objetos json que llegan del servidor
app.use(cors({
  origin: '*'
}));
app.set("pkg", _package["default"]); //Necesitamos guardar los datos del proyecto que traemos de package.json, se guardaran en un tipo de variable de express, se usa un metodo llamado set, este metodo es para ponerle un ombre y valor a la variable.

app.get('/', function (req, res) {
  // creamos una ruta get
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    //traemos los datos especificos desde pkg
    version: app.get("pkg").version,
    description: app.get("pkg").description
  });
});
app.use("/api/pets", _pets["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/users", _user["default"]);
var _default = app; //para poderlo usar en index.js
exports["default"] = _default;