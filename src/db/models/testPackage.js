const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')
class testpackage extends Model {}
testpackage.init({
  name: {type:DataTypes.TEXT},
  title: {type:DataTypes.TEXT},
  img: {type:DataTypes.TEXT},
  desc: {type:DataTypes.TEXT},
  price: {type:DataTypes.FLOAT},



}, { sequelize, modelName: 'testpackage',  timestamps: true,
});
module.exports = testpackage;

