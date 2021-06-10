import express from "express";
require('dotenv').config()

import user from "./routes/user.js";
import tests from "./routes/tests.js";
import 'core-js/stable';

import 'regenerator-runtime/runtime';
const sequelize = require("./db/dbConnect");
import  './db/relations.js'
import cors from "cors";
import helmet from "helmet";
import options from './documentation/docConf'
const expressJSDocSwagger = require('express-jsdoc-swagger');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(process.env.ORIGIN);
app.use(
  cors({
    origin: [process.env.ORIGIN , 'http://localhost:3000'],
  })
);
app.use(helmet());
app.set("port", process.env.PORT || 5000);
app.use("/user", user);
app.use("/tests", tests);
expressJSDocSwagger(app)(options);

app.listen(app.get("port"), () => {
  sequelize
    .sync({ force: false })
    .then(() => console.log("conectado a la base de datos"))
    .catch((err) => console.log(err, "error al conectar con la base de datos"));
  console.log("Servidor Encendido, en el puerto:", app.get("port"));
});
