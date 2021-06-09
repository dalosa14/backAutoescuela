import express from "express";
require('dotenv').config()

import user from "./routes/user.js";
import tests from "./routes/tests.js";
import 'core-js/stable';

import 'regenerator-runtime/runtime';
const sequelize = require("./db/dbConnect");
import relations from './db/relations.js'
import cors from "cors";
import helmet from "helmet";
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(process.env.ORIGIN);
app.use(
  cors({
    origin: ['https://thegoodtest.onrender.com/'],
  })
);
app.use(helmet());
app.set("port", process.env.PORT || 5000);
app.use("/user", user);
app.use("/tests", tests);
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Autoescuela",
    version: "1.0.0",
    description:
      'This is a REST API application made with Express.',
  },
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'Development server',
    },
]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["C:/Users/sagar/Desktop/tfg autoescuela/backend/src/documentation/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(app.get("port"), () => {
  sequelize
    .sync({ force: false })
    .then(() => console.log("conectado a la base de datos"))
    .catch((err) => console.log(err, "error al conectar con la base de datos"));
  console.log("Servidor Encendido, en el puerto:", app.get("port"));
});
