const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')
class question extends Model {}
question.init({
  name: {type:DataTypes.TEXT},
  question: {type:DataTypes.TEXT},
  img: {type:DataTypes.TEXT,default:"https://cdn.hackernoon.com/images/0yoL1qaNrbha3fHvYlEynf39lG12-qx9l33co.jpeg"},



}, { sequelize, modelName: 'question',  timestamps: true,
});
module.exports = question;

