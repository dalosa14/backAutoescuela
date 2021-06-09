"use strict";

var database = {
  username: process.env.DB_USERNAME || 'bcd1333518890c',
  password: process.env.DB_PASSWORD || 'd81a913a',
  database: process.env.DB_DATABASE || 'heroku_7bd13087cde2af2',
  host: process.env.DB_HOST || 'us-cdbr-east-04.cleardb.com'
};
// mysql://bcd1333518890c:@/heroku_7bd13087cde2af2?reconnect=true
module.exports = {
  database: database
};