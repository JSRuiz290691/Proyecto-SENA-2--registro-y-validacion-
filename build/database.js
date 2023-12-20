"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* mongoose.connect("mongodb://localhost/veterinariadb",{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}) 

    .then(db => console.log("db is connected"))
    .catch(error => console.log(error))

*/

var url = 'mongodb+srv://jsdark25:Vete123456789@dbveterinaria1.ybbimar.mongodb.net/?retryWrites=true&w=majority';
_mongoose["default"].Promise = global.Promise;
_mongoose["default"].connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (db) {
  return console.log("db is connected");
})["catch"](function (error) {
  return console.log(error);
});