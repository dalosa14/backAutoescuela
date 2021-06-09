"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var _require2 = require('./config'),
    database = _require2.database;

var sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: 'postgres'
});
module.exports = sequelize;