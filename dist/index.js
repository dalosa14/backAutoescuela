"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _tests = _interopRequireDefault(require("./routes/tests.js"));

require("core-js/stable");

require("regenerator-runtime/runtime");

require("./db/relations.js");

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _docConf = _interopRequireDefault(require("./documentation/docConf"));

require('dotenv').config();

var sequelize = require("./db/dbConnect");

var expressJSDocSwagger = require('express-jsdoc-swagger');

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
console.log(process.env.ORIGIN);
app.use((0, _cors["default"])({
  origin: [process.env.ORIGIN, 'http://localhost:3000']
}));
app.use((0, _helmet["default"])());
app.set("port", process.env.PORT || 5000);
app.use("/user", _user["default"]);
app.use("/tests", _tests["default"]);
expressJSDocSwagger(app)(_docConf["default"]);
app.listen(app.get("port"), function () {
  sequelize.sync({
    force: false
  }).then(function () {
    return console.log("conectado a la base de datos");
  })["catch"](function (err) {
    return console.log(err, "error al conectar con la base de datos");
  });
  console.log("Servidor Encendido, en el puerto:", app.get("port"));
});