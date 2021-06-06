const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')
class test extends Model {}
test.init({
  name: {type:DataTypes.TEXT},
  
  img: {type:DataTypes.TEXT,default:"https://cdn.hackernoon.com/images/0yoL1qaNrbha3fHvYlEynf39lG12-qx9l33co.jpeg"},



}, { sequelize, modelName: 'test',  timestamps: true,
});
module.exports = test;

