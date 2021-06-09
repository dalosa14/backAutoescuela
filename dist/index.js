"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _tests = _interopRequireDefault(require("./routes/tests.js"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _relations = _interopRequireDefault(require("./db/relations.js"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var sequelize = require("./db/dbConnect");

var swaggerUi = require("swagger-ui-express");

var swaggerJSDoc = require("swagger-jsdoc");

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])({
  origin: ["http://localhost:3000"]
}));
app.use((0, _helmet["default"])());
app.set("port", process.env.PORT || 5000);
app.use("/user", _user["default"]);
app.use("/tests", _tests["default"]);
var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Autoescuela",
    version: "1.0.0",
    description: 'This is a REST API application made with Express.'
  },
  servers: [{
    url: 'http://localhost:8080/',
    description: 'Development server'
  }]
};
var options = {
  swaggerDefinition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["C:/Users/sagar/Desktop/tfg autoescuela/backend/src/documentation/*.js"]
};
var swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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